console.log("HELLO FROM MONGOOSE");

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/classExample');

var userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    status: {
        type: String,
        enum: ['MARRIED', 'SINGLE']
    },
    dob: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

var userModel = mongoose.model('userModel', userSchema);

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({ username: username });
}

function findUserById(userId) {
    return userModel.findOne({ _id: userId });
}

function updateUser(userId, newUser) {
    return userModel.update({ _id: userId }, {
        $set: {
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        }
    });

    // return userModel.update({ _id: userId }, newUser);
}

function removeUser(userId) {
    return userModel.remove({ _id: userId });
}

// createUser({ username: 'bob' });

var userId = '598267bcd85afd2dc0626134';

// findUserById(userId).then(function(user) {
//     console.log(user);
// });

// updateUser(userId, {
//     username: 'BOB',
//     firstName: 'update',
//     lastName: 'UPDATE'
// }).then(function(status) {
//     console.log(status);
// });

// findUserByUsername('bob').then(function(user) {
//     console.log(user);
// });

removeUser(userId).then(function(status) {
    console.log(status);
});