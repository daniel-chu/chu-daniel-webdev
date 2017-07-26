var app = require('../../express');

// temporary counter for id generation before we implement database. starts at 1000 because there are
// already some in the given users array
var idCounter = 1000;

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findPagesByWebsiteId);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body.page;

    page._id = (idCounter++).toString();
    page.websiteId = websiteId;
    pages.push(page);

    res.send(page);
}

function findPagesByWebsiteId(req, res) {
    var websiteId = req.params.websiteId;
    var pagesInWebsite = [];

    for (var i = 0; i < pages.length; i++) {
        var curPage = pages[i];
        if (curPage.websiteId == websiteId) {
            pagesInWebsite.push(curPage);
        }
    }

    res.send(pagesInWebsite);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;

    for (var i = 0; i < pages.length; i++) {
        if (pages[i]._id == pageId) {
            res.send(pages[i]);
            return;
        }
    }

    res.send(null);
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body.page;

    for (var i = 0; i < pages.length; i++) {
        if (pages[i]._id == pageId) {
            pages[i] = page;
            res.send(pages[i]);
            return;
        }
    }

    res.send(null);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;

    for (var i = 0; i < pages.length; i++) {
        if (pages[i]._id == pageId) {
            res.send(pages.splice(i, 1));
            return;
        }
    }
    
    res.send(null);
}
