(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {
        var vm = this;
        vm.register = register;

        function register(userRegistrationInfo) {
            if (isValidRegistrationInfo(userRegistrationInfo)) {
                var user = {
                    username: userRegistrationInfo.username,
                    password: userRegistrationInfo.password,
                    firstName: userRegistrationInfo.firstName,
                    lastName: userRegistrationInfo.lastName,
                    email: userRegistrationInfo.email,
                };
                userService.createUser(user);
                $location.url('/user/' + user._id);
            }
        }

        function isValidRegistrationInfo(userRegistrationInfo) {
            if (!userRegistrationInfo) {
                vm.alert = 'Please fill in fields.';
                return false;
            }
            var username = userRegistrationInfo.username;
            var password = userRegistrationInfo.password;
            var verifyPassword = userRegistrationInfo.verifyPassword;
            var email = userRegistrationInfo.email;
            var firstName = userRegistrationInfo.firstName;
            var lastName = userRegistrationInfo.lastName;

            if (!(username && password && verifyPassword)) {
                vm.alert = 'Username, password, and verify password fields are required.';
                return false;
            }

            if (username.trim().length === 0) {
                vm.alert = 'Username cannot be empty space.';
            }

            if (userService.findUserByUsername(username)) {
                vm.alert = 'Username already taken.'
                return false;
            }

            if (password !== verifyPassword) {
                vm.alert = 'Passwords do not match.';
                return false;
            }

            return true;
        }

    }

})();