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

            websiteService.updateWebsite(vm.websiteId, website).then(function(response) {
                if (response.data) {
                    $location.url('/user/' + vm.userId + '/website');
                } else {
                    vm.alert = "Error with deleting website.";
                }
            });
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.websiteId).then(function(response) {
                if (response.data) {
                    $location.url('/user/' + vm.userId + '/website');
                } else {
                    vm.alert = "Error with deleting website.";
                }
            });
        }

        function init() {
            websiteService.findWebsiteById(vm.websiteId).then(function(response) {
                vm.website = response.data;
            });

            websiteService.findWebsitesByUser(vm.userId).then(function(response) {
                vm.websiteList = response.data;
            });
        }

        init();
    }

})();
