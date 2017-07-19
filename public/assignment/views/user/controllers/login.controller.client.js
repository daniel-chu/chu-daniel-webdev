(function () {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var vm = this;
        vm.login = login;

        function login(userLoginInfo) {
            var user;

            if (userLoginInfo && userLoginInfo.username && userLoginInfo.password) {
                user = userService.findUserByCredentials(userLoginInfo.username, userLoginInfo.password);
            }

            if (user) {
                $location.url('/user/' + user._id);
            } else {
                vm.alert = 'Invalid username/password';
            }
        }
    }

})();