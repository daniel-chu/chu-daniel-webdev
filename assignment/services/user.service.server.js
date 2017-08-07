var app = require('../../express');
var UserModel = require('../model/user/user.model.server.js');

// { _id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
// { _id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
// { _id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
// { _id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }

app.post('/api/user', createUser);
app.get('/api/user', findUser)
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

function createUser(req, res) {
    var user = req.body.user;

    UserModel.createUser(user).then(function(newUser) {
        res.send(newUser);
    });
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    UserModel.findUserByCredentials(username, password).then(function(user) {
        res.send(user);
    });
}

function findUserById(req, res) {
    var userId = req.params.userId;

    UserModel.findUserById(userId).then(function(user) {
        res.send(user);
    });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body.user;

    UserModel.updateUser(userId, user).then(function(status) {
        res.sendStatus(204);
    });
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    UserModel.deleteUser(userId).then(function(status) {
        res.sendStatus(204);
    });
}