var app = require('../../express');
var WebsiteModel = require('../model/website/website.model.server.js');

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findWebsitesByUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

function createWebsite(req, res) {
    var userId = req.params.userId;
    var website = req.body.website;

    WebsiteModel.createWebsiteForUser(userId, website).then(function(newWebsite) {
        res.send(newWebsite);
    });
}

function findWebsitesByUser(req, res) {
    var userId = req.params.userId;

    WebsiteModel.findAllWebsitesForUser(userId).then(function(websites) {
        res.send(websites);
    });
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;

    WebsiteModel.findWebsiteById(websiteId).then(function(website) {
        res.send(website);
    });
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body.website;

    WebsiteModel.updateWebsite(websiteId, website).then(function(status) {
        res.sendStatus(204);
    });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    WebsiteModel.deleteWebsite(websiteId).then(function(status) {
        res.sendStatus(204);
    });
}