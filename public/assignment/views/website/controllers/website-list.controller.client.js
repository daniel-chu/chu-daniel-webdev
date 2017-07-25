(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        function init() {
            websiteService.findWebsitesByUser(vm.userId).then(function(response) {
                vm.websiteList = response.data;
            });
        }

        init();
    }

})();
