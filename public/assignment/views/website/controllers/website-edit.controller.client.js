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
            if (!(website || website.name)) {
                vm.alert = "Website must have a name.";
                return;
            }
            websiteService.updateWebsite(vm.websiteId, website);
            $location.url('/user/' + vm.userId + '/website');
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.websiteId);
            $location.url('/user/' + vm.userId + '/website');
        }

        function init() {
            // TODO we are temporarily copying the object so we don't modify it directly while editing (only when saved)
            vm.website = WebAppMakerUtil.shallowCopy(websiteService.findWebsiteById(vm.websiteId));
            vm.websiteList = websiteService.findWebsitesByUser(vm.userId);
        }

        init();
    }

})();