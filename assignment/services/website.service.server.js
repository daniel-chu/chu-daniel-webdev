var app = require('../../express');

// temporary counter for id generation before we implement database. starts at 1000 because there are
// already some in the given users array
var idCounter = 1000;

var websites = [
    { "_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go", "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem" }
];

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findWebsitesByUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

function createWebsite(req, res) {
    var userId = req.params.userId;
    var website = req.body.website;

    website._id = idCounter++;
    website.developerId = userId;
    websites.push(website);

    res.send(website);
}

function findWebsitesByUser(req, res) {
    var userId = req.params.userId;

    var usersWebsites = [];

    for (var i = 0; i < websites.length; i++) {
        var curWebsite = websites[i];
        if (curWebsite.developerId == userId) {
            usersWebsites.push(curWebsite);
        }
    }

    res.send(usersWebsites);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;

    for (var i = 0; i < websites.length; i++) {
        if (websites[i]._id == websiteId) {
            res.send(websites[i]);
            return;
        }
    }
    return null;
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body.website;

    for (var i = 0; i < websites.length; i++) {
        if (websites[i]._id == websiteId) {
            websites[i] = website;
            res.send(websites[i]);
            return;
        }
    }
    res.send(null);
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    for (var i = 0; i < websites.length; i++) {
        if (websites[i]._id == websiteId) {
            res.send(websites.splice(i, 1));
            return;
        }
    }
    res.send(null);
}
