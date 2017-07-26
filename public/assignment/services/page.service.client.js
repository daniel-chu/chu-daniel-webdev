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
            });
        }

        function findPagesByWebsiteId(websiteId) {
            var url = '/api/website/' + websiteId + '/page';
            return $http({
                method: 'GET',
                url: url
            });
        }

        function findPageById(pageId) {
            var url = '/api/page/' + pageId;
            return $http({
                method: 'GET',
                url: url
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
            });
        }

        function deletePage(pageId) {
            var url = '/api/page/' + pageId;
            return $http({
                method: 'DELETE',
                url: url
            });
        }
    }

})();
