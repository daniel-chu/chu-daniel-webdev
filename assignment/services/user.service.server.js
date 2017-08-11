var app = require('../../express');
var UserModel = require('../model/user/user.model.server.js');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var auth = authorized;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
app.post('/api/user', createUser);
app.get('/api/user', findUserByUsername)
app.post('/api/logout', logout);
app.get('/api/checkLogin', checkLogin);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', auth, updateUser);
app.delete('/api/user/:userId', auth, deleteUser);

app.post('/api/login', function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        if (!user) {
            return res.send(null);
        }
        req.logIn(user, function (err) {
            return res.send(user);
        });
    })(req, res);
});

function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
};

function createUser(req, res) {
    var user = req.body.user;
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);

    UserModel.createUser(user)
        .then(function (newUser) {
            req.logIn(newUser, function (err) {
                res.send(newUser);
            });
        });
}

function findUserByUsername(req, res) {
    var username = req.query.username;

    UserModel.findUserByUsername(username).then(function (user) {
        res.send(user);
    });
}

function localStrategy(username, password, done) {
    UserModel.findUserByUsername(username, password)
        .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                }
                return done(null, false);
            },
            function (err) {
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

    UserModel.findUserById(userId).then(function (user) {
        res.send(user);
    });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body.user;

    UserModel.updateUser(userId, user).then(function (status) {
        res.sendStatus(204);
    });
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    UserModel.deleteUser(userId).then(function (status) {
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
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}