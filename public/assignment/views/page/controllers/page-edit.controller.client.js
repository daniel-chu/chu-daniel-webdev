(function () {
    angular
        .module('WebAppMaker')
        .controller('editPageController', editPageController);

    function editPageController($routeParams, pageService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        function init() {
            vm.page = pageService.findPageById(pageId);
        }

        init();
    }

})();