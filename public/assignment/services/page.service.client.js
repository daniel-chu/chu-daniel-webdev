(function () {
    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        }

        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId) {
            var pagesInWebsite = [];

            for (var i = 0; i < pages.length; i++) {
                var curPage = pages[i];
                if (curPage.websiteId == websiteId) {
                    pagesInWebsite.push(curPage);
                }
            }

            return pagesInWebsite;
        }

        function findPageById(pageId) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    return pages[i];
                }
            }

            return null;
        }

        function updatePage(pageId, page) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    pages[i] = page;
                }
            }
        }

        function deletePage(pageId) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    pages.splice(i, 1);
                }
            }
        }
    }

})();