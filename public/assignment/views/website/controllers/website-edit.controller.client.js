(function () {
    angular
        .module('WebAppMaker')
        .controller('editWebsiteController', editWebsiteController);

    function editWebsiteController($routeParams, $location, websiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            websiteService.updateWebsite(vm.websiteId, website)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website');
                });
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.websiteId)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website');
                });
        }

        function init() {
            vm.website = websiteService.findWebsiteById(vm.websiteId);
        }

        init();
    }

})();