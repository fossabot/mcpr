const bukkitApi = require('../../lib/bukkitApi');
const slugify = require('../../lib/slug');

exports.show = function (req, res, next) {
    bukkitApi.getPlugin(req.params.id)
        .then((res) => {
            if (!res) return res.status(404).end();
            bukkitApi.getPluginFiles(req.params.id)
                .then((files) => {
                    let jsonFiles = JSON.parse(files);
                    let latestFiles = jsonFiles[0];
                    let jsonRes = JSON.parse(res);
                    let keywords = [];
                    let lt = jsonRes.categories.length;
                    for (var i = 0; i < lt; i++) {
                        (function () {
                            let slug = slugify(jsonRes.categories[i].name);
                            keywords.push(slug);
                        })();
                    }
                    let plugin = {
                        _id: req.params.id,
                        short_description: jsonRes.shortdescription,
                        title: jsonRes.title,
                        author: jsonRes.authors,
                        latest_version_date: jsonRes.lastrelease,
                        latest_version: latestFiles.name,
                        latest_version_file: latestFiles,
                        readme: jsonRes.description,
                        keywords: keywords,
                        externalUrl: jsonRes.url,
                        external: 'bukkitdev'
                    }
                    req.bukkitPlugin = plugin;
                    next();
                })
                .catch((err) => {
                    console.error(err)
                    return handleError(res, err);
                });
        })
        .catch((err) => {
            console.error(err)
            return handleError(res, err);
        });
}

exports.all = function (req, res, next) {
    bukkitApi.getAll()
        .then((res) => {
            jsonRes = JSON.parse(res);
            req.bukkitPlugin = plugin;
            next();
        })
        .catch((err) => {
            console.error(err)
            return handleError(res, err);
        });
}

function handleError(res, err) {
    console.log('ERROR: ' + err);
    if (err.statusCode = 404) {
        return res.status(404).send(err).end();
    }
    return res.status(500).send(err);
}