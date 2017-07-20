(function () {
    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService() {
        // temporary counter for id generation before we implement database. starts at 1000 because there are
        // already some in the given pages array
        var idCounter = 1000;

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
            page._id = idCounter++;
            page.websiteId = websiteId;
            pages.push(page);
            return page;
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
                    return angular.copy(pages[i]);
                }
            }

            return null;
        }

        function updatePage(pageId, page) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    pages[i] = page;
                    return page;
                }
            }
        }

        function deletePage(pageId) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    return pages.splice(i, 1);
                }
            }
        }
    }

})();