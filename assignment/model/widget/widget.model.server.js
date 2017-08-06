var mongoose = require('mongoose');

var WidgetSchema = require('./widget.schema.server');
var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
var PageModel = require('../page/page.model.server');

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return WidgetModel.create(widget).then(function(newWidget) {
        return PageModel.addWidget(newWidget._page, newWidget._id);
    });
}

function findAllWidgetsForPage(pageId) {
    return PageModel.getWidgetListForPage(pageId);
}

function findWidgetById(widgetId) {
    return WidgetModel.findOne({ _id: widgetId });
}

function updateWidget(widgetId, widget) {
    return WidgetModel.update({ _id: widgetId }, { $set: widget });
}

function deleteWidget(widgetId) {
    return WidgetModel.findOneAndRemove({ _id: widgetId }).then(function(deletedWidget) {
        return PageModel.removeWidget(deletedWidget._page, deletedWidget._id);
    });
}

function reorderWidget(pageId, start, end) {
    return PageModel.findOne({ _id: pageId }).then(function(page) {
        var widgetIdToMove = page.widgets.splice(start)[0];
        page.widgets.splice(end, 0, widgetIdToMove);
        return page.save();
    });
}