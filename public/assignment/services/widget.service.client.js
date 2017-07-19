(function () {
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);

    function widgetService() {
        var widgets = [
            {
                "_id": "123",
                "widgetType": "HEADING",
                "pageId": "321", "size": 2,
                "text": "GIZMODO"
            },
            {
                "_id": "234",
                "widgetType": "HEADING",
                "pageId": "321", "size": 4,
                "text": "Lorem ipsum"
            },
            {
                "_id": "345",
                "widgetType": "IMAGE",
                "pageId": "321",
                "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {
                "_id": "456",
                "widgetType": "HTML",
                "pageId": "321",
                "text": "<p>Lorem ipsum</p>"
            },
            {
                "_id": "567",
                "widgetType": "HEADING",
                "pageId": "321", "size": 4,
                "text": "Lorem ipsum"
            },
            {
                "_id": "678",
                "widgetType": "YOUTUBE",
                "pageId": "321",
                "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {
                "_id": "789",
                "widgetType": "HTML",
                "pageId": "321",
                "text": "<p>Lorem ipsum</p>"
            }
        ];


        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        }

        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var widgetsInPage = [];

            for (var i = 0; i < widgets.length; i++) {
                var curWidget = widgets[i];
                if (curWidget.pageId == pageId) {
                    widgetsInPage.push(curWidget);
                }
            }

            return widgetsInPage;
        }

        function findWidgetById(widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id == widgetId) {
                    return widgets[i];
                }
            }

            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id == widgetId) {
                    widgets[i] = widget;
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id == widgetId) {
                    widgets.splice(i, 1);
                }
            }
        }
    }

})();