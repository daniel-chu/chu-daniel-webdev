(function() {
    angular
        .module('WebAppMaker')
        .controller('newWebsiteController', newWebsiteController);

    function newWebsiteController($routeParams, $location, websiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            if (!(website && website.name)) {
                vm.alert = "Website must have a name.";
                return;
            }
            websiteService.createWebsite(vm.userId, website).then(function(newWebsite) {
                if (newWebsite) {
                    $location.url('/user/' + vm.userId + '/website');
                } else {
                    vm.alert = "Error with creating website.";
                }
            });
        }

        function init() {
            websiteService.findWebsitesByUser(vm.userId).then(function(websiteList) {
                vm.websiteList = websiteList;
            });
        }

        init();
    }

})();
