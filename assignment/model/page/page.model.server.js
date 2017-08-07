var mongoose = require('mongoose');
var PageSchema = require('./page.schema.server');
var PageModel = mongoose.model('PageModel', PageSchema);
var WebsiteModel = require('../website/website.model.server');

PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;

PageModel.addWidget = addWidget;
PageModel.removeWidget = removeWidget;

PageModel.getWidgetListForPage = getWidgetListForPage;

module.exports = PageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return PageModel.create(page).then(function (newPage) {
        return WebsiteModel.addPage(newPage._website, newPage._id).then(function() {
            return newPage;
        });
    });
}

function findAllPagesForWebsite(websiteId) {
    return PageModel.find({_website: websiteId});
}

function findPageById(pageId) {
    return PageModel.findOne({_id: pageId});
}

function updatePage(pageId, page) {
    return PageModel.updateOne({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    return PageModel.findOneAndRemove({_id: pageId}).then(function (deletedPage) {
        return WebsiteModel.removePage(deletedPage._website, deletedPage._id);
    });
}

function addWidget(pageId, widgetId) {
    return PageModel.findOne({_id: pageId}).then(function (page) {
        page.widgets.push(widgetId);
        return page.save();
    });
}

function removeWidget(pageId, widgetId) {
    return PageModel.findOne({_id: pageId}).then(function (page) {
        var widgetIndex = page.widgets.indexOf(widgetId);
        page.widgets.splice(widgetIndex, 1);
        return page.save();
    });
}

function getWidgetListForPage(pageId) {
    return PageModel
        .findOne({_id: pageId})
        .populate('widgets')
        .exec().then(function(page) {
            return page.widgets;
        });
}