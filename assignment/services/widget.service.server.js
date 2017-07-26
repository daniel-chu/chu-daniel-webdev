var app = require('../../express');

// temporary counter for id generation before we implement database. starts at 1000 because there are
// already some in the given websites array
var idCounter = 1000;

var widgets = [{
    "_id": "123",
    "widgetType": "HEADING",
    "pageId": "321",
    "size": 2,
    "text": "GIZMODO"
}, {
    "_id": "234",
    "widgetType": "HEADING",
    "pageId": "321",
    "size": 4,
    "text": "Lorem ipsum"
}, {
    "_id": "345",
    "widgetType": "IMAGE",
    "pageId": "321",
    "width": "100%",
    "url": "http://lorempixel.com/400/200/"
}, {
    "_id": "456",
    "widgetType": "HTML",
    "pageId": "321",
    "text": "<p>Lorem ipsum</p>"
}, {
    "_id": "567",
    "widgetType": "HEADING",
    "pageId": "321",
    "size": 4,
    "text": "Lorem ipsum"
}, {
    "_id": "678",
    "widgetType": "YOUTUBE",
    "pageId": "321",
    "width": "100%",
    "url": "https://youtu.be/AM2Ivdi9c4E"
}, {
    "_id": "789",
    "widgetType": "HTML",
    "pageId": "321",
    "text": "<p>Lorem ipsum</p>"
}];

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);

function createWidget(req, res) {
    var pageId = req.params.pageId;
    var widget = req.body.widget;

    widget._id = idCounter++;
    widget.pageId = pageId;
    widgets.push(widget);

    res.send(widget);
}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    var widgetsInPage = [];

    for (var i = 0; i < widgets.length; i++) {
        var curWidget = widgets[i];
        if (curWidget.pageId == pageId) {
            widgetsInPage.push(curWidget);
        }
    }

    return res.send(widgetsInPage);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    for (var i = 0; i < widgets.length; i++) {
        if (widgets[i]._id == widgetId) {
            res.send(widgets[i]);
            return;
        }
    }

    res.send(null);
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body.widget;

    for (var i = 0; i < widgets.length; i++) {
        if (widgets[i]._id == widgetId) {
            widgets[i] = widget;
            res.send(widgets[i]);
            return;
        }
    }

    res.send(null);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    for (var i = 0; i < widgets.length; i++) {
        if (widgets[i]._id == widgetId) {
            res.send(widgets.splice(i, 1));
            return;
        }
    }

    res.send(null);
}
