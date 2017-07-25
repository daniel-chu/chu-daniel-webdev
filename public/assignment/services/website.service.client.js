(function() {
    angular
        .module("WebAppMaker")
        .factory("websiteService", websiteService);

    function websiteService($http) {

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        }

        return api;

        function createWebsite(userId, website) {
            var url = '/api/user/' + userId + '/website';
            return $http({
                method: 'POST',
                url: url,
                data: {
                    website: website
                }
            });
        }

        function findWebsitesByUser(userId) {
            var url = '/api/user/' + userId + '/website';
            return $http({
                method: 'GET',
                url: url
            });
        }

        function findWebsiteById(websiteId) {
            var url = '/api/website/' + websiteId;
            return $http({
                method: 'GET',
                url: url
            });
        }

        function updateWebsite(websiteId, website) {
            var url = '/api/website/' + websiteId;
            return $http({
                method: 'PUT',
                url: url,
                data: {
                    website: website
                }
            });
        }

        function deleteWebsite(websiteId) {
            var url = '/api/website/' + websiteId;
            return $http({
                method: 'DELETE',
                url: url
            });
        }
    }

})();
