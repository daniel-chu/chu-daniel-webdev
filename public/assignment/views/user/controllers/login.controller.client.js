(function() {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            user = userService.findUserByCredentials(user.username, user.password);
            if(user) {
                $location.url('/user/' + user._id);
            } else {
                vm.alert = "Unable to login.";
            }
        }


    }

})();