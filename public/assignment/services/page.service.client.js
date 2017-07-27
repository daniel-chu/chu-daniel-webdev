(function() {
    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService($http) {

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        }

        return api;

        function createPage(websiteId, page) {
            var url = '/api/website/' + websiteId + '/page';
            return $http({
                method: 'POST',
                url: url,
                data: {
                    page: page
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function findPagesByWebsiteId(websiteId) {
            var url = '/api/website/' + websiteId + '/page';
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function findPageById(pageId) {
            var url = '/api/page/' + pageId;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }

        function updatePage(pageId, page) {
            var url = '/api/page/' + pageId;
            return $http({
                method: 'PUT',
                url: url,
                data: {
                    page: page
                }
            }).then(function(response) {
                return response.data;
            });
        }

        function deletePage(pageId) {
            var url = '/api/page/' + pageId;
            return $http({
                method: 'DELETE',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }
    }

})();
