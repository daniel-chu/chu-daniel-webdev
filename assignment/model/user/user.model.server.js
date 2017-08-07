var mongoose = require('mongoose');
var UserSchema = require('./user.schema.server');
var UserModel = mongoose.model('UserModel', UserSchema);

UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;

UserModel.addWebsite = addWebsite;
UserModel.removeWebsite = removeWebsite;

module.exports = UserModel;

function createUser(user) {
    return UserModel.create(user);
}

function findUserById(userId) {
    return UserModel.findOne({ _id: userId });
}

function findUserByUsername(username) {
    return UserModel.findOne({ username: username });
}

function findUserByCredentials(username, password) {
    return UserModel.findOne({ username: username, password: password });
}

function updateUser(userId, user) {
    return UserModel.updateOne({ _id: userId }, { $set: user });
}

function deleteUser(userId) {
    return UserModel.deleteOne({ _id: userId });
}

function addWebsite(userId, websiteId) {
    return UserModel.findOne({ _id: userId }).then(function(user) {
        user.websites.push(websiteId);
        return user.save();
    });
}

function removeWebsite(userId, websiteId) {
    return UserModel.findOne({ _id: userId }).then(function(user) {
        var websiteIndex = user.websites.indexOf(websiteId);
        user.websites.splice(websiteIndex, 1);
        return user.save();
    });
}