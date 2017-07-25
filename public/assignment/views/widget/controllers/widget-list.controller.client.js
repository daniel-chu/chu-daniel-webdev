(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams, widgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.convertYoutubeUrlToEmbedUrl = convertYoutubeUrlToEmbedUrl;
        vm.trustUrl = trustUrl;
        vm.trustHtml = trustHtml;

        function convertYoutubeUrlToEmbedUrl(youtubeUrl) {
            var embedBaseUrl = "https://www.youtube.com/embed/";
            var urlArray = youtubeUrl.split('/');
            var youtubeVideoCode = urlArray[urlArray.length - 1];
        
            return embedBaseUrl + youtubeVideoCode;
        }

        function trustUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function trustHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function init() {
            vm.widgetList = widgetService.findWidgetsByPageId(vm.pageId);
        }

        init();
    }

})();