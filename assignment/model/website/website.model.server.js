var mongoose = require('mongoose');
var WebsiteSchema = require('./website.schema.server');
var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
var UserModel = require('../user/user.model.server');

WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;

WebsiteModel.addPage = addPage;
WebsiteModel.removePage = removePage;

module.exports = WebsiteModel;

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return WebsiteModel.create(website).then(function(newWebsite) {
        return UserModel.addWebsite(newWebsite._user, newWebsite._id);
    });
}

function findAllWebsitesForUser(userId) {
    return WebsiteModel.find({ _user: userId });
}

function findWebsiteById(websiteId) {
    return WebsiteModel.findOne({ _id: websiteId });
}

function updateWebsite(websiteId, website) {
    return WebsiteModel.updateOne({ _id: websiteId }, { $set: website });
}

function deleteWebsite(websiteId) {
    return WebsiteModel.findOneAndRemove({ _id: websiteId }).then(function(deletedWebsite) {
        return UserModel.removeWebsite(deletedWebsite._user, deletedWebsite._id);
    });
}

function addPage(websiteId, pageId) {
    return WebsiteModel.findOne({ _id: websiteId }).then(function(website) {
        website.pages.push(pageId);
        return website.save();
    });
}

function removePage(websiteId, pageId) {
    return WebsiteModel.findOne({ _id: websiteId }).then(function(website) {
        var pageIndex = website.pages.indexOf(pageId);
        website.pages.splice(pageIndex, 1);
        return website.save();
    });
}