(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        function init() {
            vm.websiteList = websiteService.findWebsitesByUser(vm.userId);
        }

        init();
    }

})();