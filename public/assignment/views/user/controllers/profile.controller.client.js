(function() {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($routeParams, $location, userService, userLoggedIn) {
        var vm = this;
        vm.userId = userLoggedIn._id;
        vm.updateProfile = updateProfile;
        vm.logout = logout;

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
                    vm.info = 'Profile successfully updated.';
                    $location.url('/user');
                });
        }

        function logout() {
            userService.logout().then(function() {
                $location.url('/login');
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
