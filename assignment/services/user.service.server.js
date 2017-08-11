var app = require('../../express');
var UserModel = require('../model/user/user.model.server.js');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// { _id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
// { _id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
// { _id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
// { _id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }

app.post('/api/user', createUser);
app.get('/api/user', findUserByUsername)
app.post('/api/login', passport.authenticate('local'), login);
app.post('/api/logout', logout);
app.get('/api/checkLogin', checkLogin);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

function createUser(req, res) {
    var user = req.body.user;

    UserModel.createUser(user).then(function(newUser) {
        res.send(newUser);
    });
}

function findUserByUsername(req, res) {
    var username = req.query.username;

    UserModel.findUserByUsername(username).then(function(user) {
        res.send(user);
    });
}

function localStrategy(username, password, done) {
    UserModel.findUserByCredentials(username, password)
        .then(function(user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) {
                    return done(err);
                }
            });
}

function login(req, res) {
    var user = req.user;

    res.send(user);
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
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

function serializeUser(user, done) {
    done(null, user._id);
}

function deserializeUser(id, done) {
    UserModel
        .findUserById(id)
        .then(
            function(user) {
                done(null, user);
            },
            function(err) {
                done(err, null);
            }
        );
}