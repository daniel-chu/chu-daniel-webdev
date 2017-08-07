var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname + '/../../public/uploads' });

var WidgetModel = require('../model/widget/widget.model.server.js');

// [{
//     "_id": "123",
//     "widgetType": "HEADING",
//     "pageId": "321",
//     "size": 2,
//     "text": "GIZMODO"
// }, {
//     "_id": "234",
//     "widgetType": "HEADING",
//     "pageId": "321",
//     "size": 4,
//     "text": "Lorem ipsum"
// }, {
//     "_id": "345",
//     "widgetType": "IMAGE",
//     "pageId": "321",
//     "width": "100%",
//     "url": "http://lorempixel.com/400/200/"
// }, {
//     "_id": "456",
//     "widgetType": "HTML",
//     "pageId": "321",
//     "text": "<p>Lorem ipsum</p>"
// }, {
//     "_id": "567",
//     "widgetType": "HEADING",
//     "pageId": "321",
//     "size": 4,
//     "text": "Lorem ipsum"
// }, {
//     "_id": "678",
//     "widgetType": "YOUTUBE",
//     "pageId": "321",
//     "width": "100%",
//     "url": "https://youtu.be/AM2Ivdi9c4E"
// }, {
//     "_id": "789",
//     "widgetType": "HTML",
//     "pageId": "321",
//     "text": "<p>Lorem ipsum</p>"
// }]

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
    
    WidgetModel.createWidget(pageId, widget).then(function(newWidget) {
        res.send(newWidget);
    });
}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;

    WidgetModel.findAllWidgetsForPage(pageId).then(function(widgets) {
        res.send(widgets);
    });
}

function reorderWidget(req, res) {
    var pageId = req.params.pageId;
    var initial = req.query.initial;
    var final = req.query.final;

    WidgetModel.reorderWidget(pageId, initial, final).then(function(page) {
        res.sendStatus(204);
    });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;

    WidgetModel.findWidgetById(widgetId).then(function(widget) {
        res.send(widget);
    });
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body.widget;

    WidgetModel.updateWidget(widgetId, widget).then(function(status) {
        res.sendStatus(204);
    });
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    WidgetModel.deleteWidget(widgetId).then(function(status) {
        res.sendStatus(204);
    });
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

    var updateWidgetPromise = WidgetModel.findWidgetById(widgetId).then(function(widget) {
        widget.url = '/uploads/' + filename;
        return widget.save();
    });

    updateWidgetPromise.then(function(widget) {
        var callbackUrl = '/assignment/#!/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;
        res.redirect(callbackUrl);
    });
}