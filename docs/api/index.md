# API

## Basic usage 
API requests should be prefixed with api and the API version. For example, the root of the v1 API is at `/api/v1`.

For endpoints that require authentication, you need to pass an `Authorization` header with your JWT token.

Example of a valid API request:

```
GET /plugins
```

Example of a valid API request using cURL and authentication via header:

```
curl --header "Authorization: Bearer YOUR_JWT_TOKEN" "https://mcpr.io/api/v1/users/me/profile"
```

The API uses JSON to serialize data. You don't need to specify .json at the end of an API URL.

## Authentication
Most API requests do not require authentication via a token. For those cases where it is required, this will be mentioned in the documentation for each individual endpoint. For example, the `UPDATE /plugin/:id` endpoint.

There currently one type of access token available:

- [JWT tokens](#jwt-token)

If authentication information is invalid or omitted, an error message will be returned with status code `401`:

```json
{
  "message": "401 Unauthorized"
}
```
### JWT Token
You can use a JWT token to authenticate with the API by passing it in the Authorization header.

Example of using the JWT token in the header:


```
curl --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5OTVlOTI0MjE2NTY2MDAxOGJiMGE4YSIsInVzZXJuYW1lIjoibnByYWlsIiwiaWF0IjoxNTAzMzE4MTIwLCJleHAiOjE1MDMzMjgyMDB9.CATgjmJm-qzq9IAYI5mFMjKe9LdFmF7pvBFMSNwDjLQ" "https://mcpr.io/api/v1/users/me/profile"
```

### Find Your JWT Token
You can find your JWT token in your browsers local storage. 

1. [Login to MCPR](https://mcpr.io/login)
2. Open your browser's Developer Tools (F12 on most OSes)
3. Go to the Console tab
4. Run the following in the console: `localStorage.getItem('id_token')`

That will give you your JWT token which will look something like this:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5OTVlOTI0MjE2NTY2MDAxOGJiMGE4YSIsInVzZXJuYW1lIjoibnByYWlsIiwiaWF0IjoxNTAzMzE4MTIwLCJleHAiOjE1MDMzMjgyMDB9.CATgjmJm-qzq9IAYI5mFMjKe9LdFmF7pvBFMSNwDjLQ
```
Now you can use that in the `Authorization` header!


!!! warning 
    The JWT tokens will expire after 2 months. You will need to replace it by following these steps again. 

!!! note 
    In the future we hope to make this process much easier and simpler...

## Pagination
Sometimes the returned result will span across many pages. When listing resources you can pass the following parameters:

|Parameter|Description|
|---------|-----------|
|`page`|Page number (default: 0)|
|`per_page`|Number of items to list per page (default: `50`)|

In the example below, we list 100 [plugins](https://docs.mcpr.io/api/#api-Plugin-GetPlugins) per page.

```
curl -i "https://mcpr.io/api/v1/plugins?per_page=100"
```