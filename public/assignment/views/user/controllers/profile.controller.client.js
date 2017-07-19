(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($routeParams, userService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.updateProfile = updateProfile;

        function updateProfile(user) {
            if (!(user && user.username && user.username.trim().length === 0)) {
                vm.info = '';
                vm.alert = 'Invalid username.';
            } else if (userService.findUserByUsername(user.username)) {
                vm.info = '';
                vm.alert = 'Username taken already.';
            }
            else {
                userService.updateUser(vm.userId, user);
                vm.alert = '';
                vm.info = 'Profile successfully updated.';
            }
        }

        function init() {
            var user = userService.findUserById(vm.userId);

            // TODO we are temporarily copying the object so we don't modify it directly while editing (only when saved)
            if (user) {
                vm.user = WebAppMakerUtil.shallowCopy(user)
            } else {
                vm.user = undefined;
            }
        }

        init();
    }

})();