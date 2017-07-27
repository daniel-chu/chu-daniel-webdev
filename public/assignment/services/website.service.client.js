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
            }).then(function(response) {
                return response.data;
            });
        }

        function findWebsitesByUser(userId) {
            var url = '/api/user/' + userId + '/website';
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function findWebsiteById(websiteId) {
            var url = '/api/website/' + websiteId;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
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
            }).then(function(response) {
                return response.data;
            });
        }

        function deleteWebsite(websiteId) {
            var url = '/api/website/' + websiteId;
            return $http({
                method: 'DELETE',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }
    }

})();
