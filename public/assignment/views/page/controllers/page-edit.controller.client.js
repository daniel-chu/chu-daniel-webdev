(function() {
    angular
        .module('WebAppMaker')
        .controller('editPageController', editPageController);

    function editPageController($routeParams, $location, pageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(page) {
            if (!(page && page.name)) {
                vm.alert = "Page must have a name.";
                return;
            }
            pageService.updatePage(vm.pageId, page).then(function() {
                $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
            });
        }

        function deletePage() {
            pageService.deletePage(vm.pageId).then(function() {
                $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
            });
        }

        function init() {
            pageService.findPageById(vm.pageId).then(function(page) {
                vm.page = page;
            });

            pageService.findPagesByWebsiteId(vm.websiteId).then(function(pageList) {
                vm.pageList = pageList;
            });
        }

        init();
    }

})();
