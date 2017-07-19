(function () {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

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
            users.push(user);
        }

        function findUserById(userId) {
            var hasMatchingUserId = function (userToCheck) {
                return userToCheck._id == userId;
            };

            return findUserMatchingPredicate(hasMatchingUserId);
        }

        function findUserByCredentials(username, password) {
            var hasSameUsernameAndPassword = function (userToCheck) {
                return userToCheck.username === username && userToCheck.password === password;
            };

            return findUserMatchingPredicate(hasSameUsernameAndPassword);
        }

        function findUserByUsername(username) {
            var hasSameUsername = function (userToCheck) {
                return userToCheck.username === username;
            };

            return findUserMatchingPredicate(hasSameUsername);
        }

        function findUserMatchingPredicate(predicateFn) {
            for (var i = 0; i < users.length; i++) {
                var curUser = users[i];
                if (predicateFn(curUser)) {
                    return curUser;
                }
            }

            return null;
        }

        function updateUser(userId, user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users[i] = user;
                }
            }
        }

        function deleteUser(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                }
            }
        }
    }

})();