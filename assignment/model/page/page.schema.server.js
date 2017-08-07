var mongoose = require('mongoose');

// TODO consider using embedded schema

var PageSchema = mongoose.Schema({
    _website: { type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel' },
    name: { type: String, required: true },
    title: String,
    description: String,
    widgets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel' }],
    dateCreated: { type: Date, default: Date.now }
}, { collection: 'page' });

module.exports = PageSchema;