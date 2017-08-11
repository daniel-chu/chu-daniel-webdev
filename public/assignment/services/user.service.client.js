(function() {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            checkLogin: checkLogin,
            findUserById: findUserById,
            login: login,
            logout: logout,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        }

        return api;

        function createUser(user) {
            var url = '/api/user'
            return $http({
                method: 'POST',
                url: url,
                data: {
                    user: user
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function checkLogin() {
            var url = '/api/checkLogin';
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function login(username, password) {
            var url = '/api/login';
            return $http({
                method: 'POST',
                url: url,
                data: {
                    username: username,
                    password: password
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function logout() {
            var url = '/api/logout';
            return $http({
                method: 'POST',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function findUserByUsername(username) {
            var url = '/api/user';
            return $http({
                method: 'GET',
                url: url,
                params: {
                    username: username
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function updateUser(userId, user) {
            var url = '/api/user/' + userId;
            return $http({
                method: 'PUT',
                url: url,
                data: {
                    user: user
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function deleteUser(userId) {
            var url = '/api/user/' + userId;
            return $http({
                method: 'DELETE',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }
    }

})();