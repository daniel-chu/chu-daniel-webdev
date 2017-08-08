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
            }).then(function(response) {
                return response.data;
            });
        }

        function findWidgetsByPageId(pageId) {
            var url = '/api/page/' + pageId + '/widget'
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
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
            }).then(function(response) {
                return response.data;
            });
        }

        function findWidgetById(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http({
                method: 'GET',
                url: url
            }).then(function(response) {
                return response.data;
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
            }).then(function(response) {
                return response.data;
            });
        }

        function deleteWidget(widgetId) {
            var url = '/api/widget/' + widgetId;
            return $http({
                method: 'DELETE',
                url: url
            }).then(function(response) {
                return response.data;
            });
        }
    }

})();
