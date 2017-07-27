(function() {
    angular
        .module('WebAppMaker')
        .controller('newWidgetController', newWidgetController);

    function newWidgetController($routeParams, $location, widgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.createNewWidgetWithType = createNewWidgetWithType;

        function createNewWidgetWithType(widgetType) {
            widgetService.createWidget(vm.pageId, {
                widgetType: widgetType
            }).then(function(newWidget) {
                if (newWidget) {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/'
                        + vm.pageId + '/widget/' + newWidget._id);
                }
            });
        }

    }

})();
