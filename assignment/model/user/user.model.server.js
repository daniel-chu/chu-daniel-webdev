var mongoose = require('mongoose');
var UserSchema = require('./user.schema.server');
var UserModel = mongoose.model('UserModel', UserSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findOne({ _id: userId });
}

function findUserByUsername(username) {
    return userModel.findOne({ username: username });
}

function findUserByCredentials(username, password) {
    return userModel.findOne({ username: username, password: password });
}

function updateUser(userId, user) {
    return userModel.updateOne({ _id: userId }, { $set: user });
}

function deleteUser(userId) {
    return userModel.deleteOne({ _id: userId });
}

function addWebsite(userId, websiteId) {
    return userModel.findOne({ _id: userId }).then(function(user) {
        user.websites.push(websiteId);
        return user.save();
    });
}

function removeWebsite(userId, websiteId) {
    return userModel.findOne({ _id: userId }).then(function(user) {
        var websiteIndex = user.websites.indexOf(websiteId);
        user.websites.splice(websiteIndex, 1);
        return user.save();
    });
}