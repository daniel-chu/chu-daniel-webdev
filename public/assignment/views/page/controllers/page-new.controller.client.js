(function() {
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
                vm.alert = 'Page must have a name.';
                return;
            }
            pageService.createPage(vm.websiteId, page).then(function(newPage) {
                if (newPage) {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
                } else {
                    vm.alert = 'Error creating page.';
                }
            });
        }

        function init() {
            pageService.findPagesByWebsiteId(vm.websiteId).then(function(pageList) {
                vm.pageList = pageList;
            });
        }

        init();
    }

})();
