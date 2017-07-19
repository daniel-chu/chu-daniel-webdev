(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($routeParams, userService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.updateProfile = updateProfile;

        function updateProfile(user) {
            if (!(user && user.username)) {
                vm.info = "";
                vm.alert = "You must have a username.";
            }
            if (user.username.trim().length === 0) {
                vm.info = "";
                vm.alert = "Username cannot be empty space.";
            }
            else {
                userService.updateUser(vm.userId, user);
                vm.alert = "";
                vm.info = "Profile successfully updated.";
            }
        }

        function init() {
            var user = userService.findUserById(vm.userId);

            // TODO temporarily doing this to avoid modifying the user object in the users array directly while editing
            // without saving. Will remove when we remove the users array in userService
            if (user) {
                vm.user = {
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                }
            } else {
                vm.user = undefined;
            }
        }

        init();
    }

})();