var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname + '/../../public/uploads' });

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
app.put('/api/page/:pageId/widget', reorderWidget);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.post('/api/upload', upload.single('imageToUpload'), uploadImage)

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

function reorderWidget(req, res) {
    var initial = req.query.initial;
    var final = req.query.final;

    var widgetBeingMoved = widgets.splice(initial, 1)[0];
    widgets.splice(final, 0, widgetBeingMoved);

    res.send(widgets);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    res.send(getWidgetById(widgetId));
}

function getWidgetById(widgetId) {
    for (var i = 0; i < widgets.length; i++) {
        if (widgets[i]._id == widgetId) {
            return widgets[i];
        }
    }
    return null;
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

function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename; // new file name in upload folder
    var path = myFile.path; // full path of uploaded file
    var destination = myFile.destination; // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    widget = getWidgetById(widgetId);
    widget.url = '/uploads/' + filename;

    var callbackUrl = '/assignment/#!/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;

    res.redirect(callbackUrl);
}
