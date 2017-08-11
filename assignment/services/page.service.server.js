var app = require('../../express');
var PageModel = require('../model/page/page.model.server.js');

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findPagesByWebsiteId);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body.page;

    PageModel.createPage(websiteId, page).then(function(newPage) {
        res.send(newPage);
    });
}

function findPagesByWebsiteId(req, res) {
    var websiteId = req.params.websiteId;
    var pagesInWebsite = [];

    PageModel.findAllPagesForWebsite(websiteId).then(function(pages) {
        res.send(pages);
    });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;

    PageModel.findPageById(pageId).then(function(page) {
        res.send(page);
    });
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body.page;

    PageModel.updatePage(pageId, page).then(function(status) {
        res.sendStatus(204);
    });
}

function deletePage(req, res) {
    var pageId = req.params.pageId;

    PageModel.deletePage(pageId).then(function(status) {
        res.sendStatus(204);
    });
}