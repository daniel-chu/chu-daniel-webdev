(function() {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var vm = this;
        vm.login = login;

        function login(userLoginInfo) {
            if (userLoginInfo && userLoginInfo.username && userLoginInfo.password) {
                userService.login(userLoginInfo.username, userLoginInfo.password).then(function(user) {
                    if (user) {
                        $location.url('/user');
                    } else {
                        vm.alert = 'Invalid username/password';
                    }
                });
            }


        }
    }

})();
