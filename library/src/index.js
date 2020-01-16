const express=require('express');
const app=express();
const fs = require('fs');
const path=require('path');
const db = require('./database');
const booklist = require('./datasrc/booklistModel');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
// Library > /api/library
// Book > /api/library/book
//

app.use(bodyParser.json());
app.use(express.static(__dirname + '/routes'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/api/library", function(req, res) {

});



//new book:
app.post('/api/library/book', function(req,res){
    var title = req.body.title;
    var author =req.body.author;
    var description =req.body.description;
    var year = req.body.year;
    var lent = req.body.lent;
    var lentBy = req.body.lentBy;
    var data = {
        "title": title,
        "author": author,
        "description" : description,
        "year": year,
        "lent": lent,
        "lentBy":lentBy
    };
    db.collection('booklist').insertOne(data,function(err, collection){
        if (err) throw err;
    });
    return res.redirect('main.html');
}) ;

app.listen(8080);
