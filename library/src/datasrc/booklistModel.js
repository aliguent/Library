const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaBooks = new Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description: String,
    year: {
        type: Number,
        required: true
    },
    lent: {
        type: Boolean,
        required: true,
        default : false
    },
    lentBy: String
}, {
    collection: 'booklist'
});

const Booklist = mongoose.model('booklist', schemaBooks);

module.exports= Booklist;