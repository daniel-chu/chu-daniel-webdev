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

        // TODO ASK ABOUT STYLING, WHERE TO PUT HELPER FUNCTIONS

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
                return userId == userToCheck._id;
            };

            return findUserMatchingPredicate(hasMatchingUserId);
        }

        function findUserByCredentials(username, password) {
            var hasSameUsernameAndPassword = function (userToCheck) {
                return username === userToCheck.username && password === userToCheck.password;
            };

            return findUserMatchingPredicate(hasSameUsernameAndPassword);
        }

        function findUserByUsername(username) {
            var hasSameUsername = function (userToCheck) {
                return username === userToCheck.username;
            };

            return findUserMatchingPredicate(hasSameUsername);
        }

        function findUserMatchingPredicate(predicateMatches) {
            for (var u in users) {
                var currentUser = users[u];
                if (predicateMatches(currentUser)) {
                    return currentUser;
                }
            }

            return null;
        }

        function updateUser(userId, user) {
            for (var u in users) {
                var currentUser = users[u];
                if (userId == currentUser._id) {
                    users[u] = user;
                }
            }
        }

        function deleteUser(userId) {
            for (var i = 0; i < users.length; i++) {
                if (userId == users[i]._id) {
                    users.splice(i, 1);
                }
            }
        }
    }


})();