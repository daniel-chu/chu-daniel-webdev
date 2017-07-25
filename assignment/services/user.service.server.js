var app = require('../../express');

// temporary counter for id generation before we implement database. starts at 1000 because there are
// already some in the given users array
var idCounter = 1000;

var users = [
    { _id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
    { _id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
    { _id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
    { _id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
];

app.post('/api/user', createUser);
app.get('/api/user', findUser)
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

function createUser(req, res) {
    var user = req.body.user;

    user._id = idCounter++;
    users.push(user);

    res.send(user);
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var predicateFn;

    if (username && password) {
        predicateFn = function(userToCheck) {
            return userToCheck.username === username && userToCheck.password === password;
        };
    } else if (username) {
        predicateFn = function(userToCheck) {
            return userToCheck.username === username;
        };
    }

    res.send(predicateFn ? findUserMatchingPredicate(predicateFn) : null);
}

function findUserById(req, res) {
    var userId = req.params.userId;

    var predicateFn = function(userToCheck) {
        return userToCheck._id == userId;
        // TODO if allowed to just make all ids numbers and not strings
    };

    res.send(findUserMatchingPredicate(predicateFn));
}

function findUserMatchingPredicate(predicateFn) {
    for (var i = 0; i < users.length; i++) {
        var curUser = users[i];
        if (predicateFn(curUser)) {
            return curUser;
        }
    }

    return null;
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body.user;

    for (var i = 0; i < users.length; i++) {
        if (users[i]._id == userId) {
            users[i] = user;
            res.send(users[i]);
            return;
        }
    }
    res.send(null);
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    for (var i = 0; i < users.length; i++) {
        if (users[i]._id == userId) {
            res.send(users.splice(i, 1)[0]);
            return;
        }
    }
    res.send(null);
}
