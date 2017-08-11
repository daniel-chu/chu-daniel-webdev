(function() {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {
        var vm = this;
        vm.register = register;

        function register(userRegistrationInfo) {
            isValidRegistrationInfo(userRegistrationInfo).then(function(valid) {
                if (valid) {
                    var user = {
                        username: userRegistrationInfo.username,
                        password: userRegistrationInfo.password,
                        firstName: userRegistrationInfo.firstName,
                        lastName: userRegistrationInfo.lastName,
                        email: userRegistrationInfo.email,
                    };
                    userService.createUser(user).then(function(newUser) {
                        if (user) {
                            $location.url('/user');
                        } else {
                            vm.alert = "Error with registration.";
                        }
                    });
                }
            });
        }

        function isValidRegistrationInfo(userRegistrationInfo) {
            if (!userRegistrationInfo) {
                vm.alert = 'Please fill in fields.';
                return Promise.resolve(false);
            }
            var username = userRegistrationInfo.username;
            var password = userRegistrationInfo.password;
            var verifyPassword = userRegistrationInfo.verifyPassword;
            var email = userRegistrationInfo.email;
            var firstName = userRegistrationInfo.firstName;
            var lastName = userRegistrationInfo.lastName;

            if (!(username && password && verifyPassword)) {
                vm.alert = 'Username, password, and verify password fields are required.';
                return Promise.resolve(false);
            }

            if (username.trim().length === 0) {
                vm.alert = 'Username cannot be empty space.';
                return Promise.resolve(false);
            }

            if (password !== verifyPassword) {
                vm.alert = 'Passwords do not match.';
                return Promise.resolve(false);
            }

            return userService.findUserByUsername(username).then(function(existingUser) {
                if (existingUser) {
                    vm.alert = 'Username already taken.';
                    return false;
                }
                return true;
            });
        }

    }

})();
