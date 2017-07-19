(function () {
    angular
        .module('WebAppMaker')
        .controller('newWebsiteController', newWebsiteController);

    function newWebsiteController($routeParams, $location, websiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            if (!(website || website.name)) {
                vm.alert = "Website must have a name.";
                return;
            }
            websiteService.createWebsite(vm.userId, website);
            $location.url('/user/' + vm.userId + '/website');
        }

        function init() {
            vm.websiteList = websiteService.findWebsitesByUser(vm.userId);
        }

        init();
    }

})();