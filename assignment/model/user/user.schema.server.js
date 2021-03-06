var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel' }],
    dateCreated: { type: Date, default: Date.now }
}, { collection: 'user' });

module.exports = UserSchema;