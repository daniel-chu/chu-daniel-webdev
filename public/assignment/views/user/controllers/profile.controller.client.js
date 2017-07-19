(function() {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($routeParams, userService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        function init() {
            vm.user = userService.findUserById(vm.userId);
        }

        init();
    }

})();