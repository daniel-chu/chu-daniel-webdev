(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams, widgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.convertYoutubeUrlToEmbedUrl = convertYoutubeUrlToEmbedUrl;

        function convertYoutubeUrlToEmbedUrl(youtubeUrl) {
            var embedBaseUrl = "https://www.youtube.com/embed/";
            var urlArray = youtubeUrl.split('/');
            var youtubeVideoCode = urlArray[urlArray.length - 1];
            console.log(youtubeVideoCode);
            return embedBaseUrl + youtubeVideoCode;
        }

        function init() {
            vm.widgetList = widgetService.findWidgetsByPageId(vm.pageId);
        }

        init();
    }

})();