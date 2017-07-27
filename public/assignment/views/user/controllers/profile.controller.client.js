(function() {
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

            userService.findUserByUsername(user.username)
                .then(function(existingUser) {
                    if (existingUser && existingUser._id !== vm.userId) {
                        vm.info = '';
                        vm.alert = 'Username taken already.';
                        return;
                    }

                    return userService.updateUser(vm.userId, user);
                })
                .then(function() {
                    vm.alert = '';
                    vm.info = 'Profile successfully updated.';;
                });
        }

        function init() {
            userService.findUserById(vm.userId)
                .then(function(user) {
                    vm.user = user;
                });
        }

        init();
    }

})();
