(function () {
    angular
        .module('WebAppMaker')
        .controller('editWidgetController', editWidgetController);

    function editWidgetController($routeParams, $location, widgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget(widget) {
            widgetService.updateWidget(vm.widgetId, widget);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
        }

        function deleteWidget() {
            widgetService.deleteWidget(vm.widgetId);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
        }

        function init() {
            vm.widget = widgetService.findWidgetById(vm.widgetId);
        }

        init();
    }

})();