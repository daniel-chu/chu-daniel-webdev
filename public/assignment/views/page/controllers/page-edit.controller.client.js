(function () {
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
            pageService.updatePage(vm.pageId, page);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
        }

        function deletePage() {
            pageService.deletePage(vm.pageId);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
        }

        function init() {
            vm.page = pageService.findPageById(vm.pageId);
            vm.pageList = pageService.findPagesByWebsiteId(vm.websiteId);
        }

        init();
    }

})();