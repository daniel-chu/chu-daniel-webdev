(function() {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init() {
            pageService.findPagesByWebsiteId(vm.websiteId).then(function(pageList) {
                vm.pageList = pageList;
            });
        }

        init();
    }

})();
