const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaBooks = new Schema({
    title: String,
    author: String,
    description: String,
    year: Number,
    lent: Boolean,
    lentBy: String
}, {
    collection: 'booklist'
});

const Booklist = mongoose.model('booklist', schemaBooks);

module.exports= Booklist;