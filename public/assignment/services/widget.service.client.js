(function() {
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);

    function widgetService($http) {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            reorderWidget: reorderWidget,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        }

        return api;

        function createWidget(pageId, widget) {
            var url = '/api/page/' + pageId + '/widget'
            return $http({
                method: 'POST',
                url: url,
                data: {
                    widget: widget
                }
            });
        }

        function findWidgetsByPageId(pageId) {
            var url = '/api/page/' + pageId + '/widget'
            return $http({
                method: 'GET',
                url: url
            });
        }

        function reorderWidget(pageId, initial, final) {
            var url = '/api/page/' + pageId + '/widget'
            return $http({
                method: 'PUT',
                url: url,
                params: {
                    initial: initial,
                    final: final
                }
            });
        }

        function findWidgetById(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http({
                method: 'GET',
                url: url
            });
        }

        function updateWidget(widgetId, widget) {
            var url = '/api/widget/' + widgetId;
            return $http({
                method: 'PUT',
                url: url,
                data: {
                    widget: widget
                }
            });
        }

        function deleteWidget(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http({
                method: 'DELETE',
                url: url
            });
        }
    }

})();
