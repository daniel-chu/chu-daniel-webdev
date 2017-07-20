(function() {
    angular
        .module('WebAppMaker')
        .controller('newWidgetController', newWidgetController);

    function newWidgetController($routeParams, $location, widgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.createHeadingWidget = createHeadingWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYoutubeWidget = createYoutubeWidget;

        function createHeadingWidget() {
            var newWidget = widgetService.createWidget(vm.pageId, {
                widgetType: 'HEADING'
            });
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/'
                + vm.pageId + '/widget/' + newWidget._id);
        }

        function createImageWidget() {
            widgetService.createWidget(vm.pageId, {
                widgetType: 'IMAGE'
            });
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/'
                + vm.pageId + '/widget/' + newWidget._id);
        }

        function createYoutubeWidget() {
            widgetService.createWidget(vm.pageId, {
                widgetType: 'YOUTUBE'
            });
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/'
                + vm.pageId + '/widget/' + newWidget._id);
        }

    }

    //TODO WIDGET-NEW NEEDS TO BE DONE

})();
