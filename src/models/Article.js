const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    routeImg: {
        type: String,
        required: true
    },
    lead: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    body: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String, 
        required: true
    }
}, {
    strict: false
});

module.exports = mongoose.model('Article', ArticleSchema);