'use strict';

angular.module('app')
    .controller('LoginCtrl', function ($scope, $http, $stateParams, auth, $state, $window) {
        $scope.user = {};
        $scope.login = function (user) {
            auth.login(user)
                .then(function (res) {
                    Materialize.toast('Login success!', 4000);
                    $state.go('profile').then(function (result) {
                        $window.location.reload();
                    });
                })
                .catch(function (err) {
                    if (err.status === 401) {
                        return Materialize.toast(err.data.message, 4000);
                    } else if (err.status === 403) {
                        return Materialize.toast(err.data.message, 4000);
                    }
                    Materialize.toast(err.statusText, 4000);
                });
        }
    });
