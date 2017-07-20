(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($routeParams, userService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.updateProfile = updateProfile;

        function updateProfile(user) {
            if (!(user && user.username && user.username.trim().length > 0)) {
                vm.info = '';
                vm.alert = 'Invalid username.';
                return;
            }

            var existingUser = userService.findUserByUsername(user.username);
            if (existingUser && existingUser._id !== vm.userId) {
                vm.info = '';
                vm.alert = 'Username taken already.';
                return;
            }

            userService.updateUser(vm.userId, user);
            vm.alert = '';
            vm.info = 'Profile successfully updated.';

        }

        function init() {
            vm.user = userService.findUserById(vm.userId);
        }

        init();
    }

})();