(function () {
    angular
        .module('WebAppMaker')
        .controller('newPageController', newPageController);

    function newPageController($routeParams, $location, pageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.createPage = createPage;

        function createPage(page) {
            if (!(page && page.name)) {
                vm.alert = "Page must have a name.";
                return;
            }
            pageService.createPage(vm.websiteId, page);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
        }

        function init() {
            vm.pageList = pageService.findPagesByWebsiteId(vm.websiteId);
        }

        init();
    }

})();