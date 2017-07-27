(function() {
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
            if (!(website && website.name)) {
                vm.alert = "Website must have a name.";
                return;
            }

            websiteService.updateWebsite(vm.websiteId, website).then(function() {
                $location.url('/user/' + vm.userId + '/website');
            });
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.websiteId).then(function() {
                $location.url('/user/' + vm.userId + '/website');
            });
        }

        function init() {
            websiteService.findWebsiteById(vm.websiteId).then(function(website) {
                vm.website = website;
            });

            websiteService.findWebsitesByUser(vm.userId).then(function(websiteList) {
                vm.websiteList = websiteList;
            });
        }

        init();
    }

})();
