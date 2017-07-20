(function () {
    angular
        .module("WebAppMaker")
        .factory("websiteService", websiteService);

    function websiteService() {
        // temporary counter for id generation before we implement database. starts at 1000 because there are
        // already some in the given websites array
        var idCounter = 1000;

        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        }

        return api;

        function createWebsite(userId, website) {
            website._id = idCounter++;
            website.developerId = userId;
            websites.push(website);
            return website;
        }

        function findWebsitesByUser(userId) {
            var usersWebsites = [];

            for (var i = 0; i < websites.length; i++) {
                var curWebsite = websites[i];
                if (curWebsite.developerId == userId) {
                    usersWebsites.push(curWebsite);
                }
            }

            return usersWebsites;
        }

        function findWebsiteById(websiteId) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id == websiteId) {
                    return angular.copy(websites[i]);
                }
            }

            return null;
        }

        function updateWebsite(websiteId, website) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id == websiteId) {
                    websites[i] = website;
                }
            }
            return website;
        }

        function deleteWebsite(websiteId) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id == websiteId) {
                    return websites.splice(i, 1);
                }
            }
        }
    }

})();