(function() {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
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
            });
        }

        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http({
                method: 'GET',
                url: url
            });
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user';
            return $http({
                method: 'GET',
                url: url,
                params: {
                    username: username,
                    password: password
                }
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
            });
        }

        function deleteUser(userId) {
            var url = '/api/user/' + userId;
            return $http({
                method: 'DELETE',
                url: url
            });
        }
    }

})();
