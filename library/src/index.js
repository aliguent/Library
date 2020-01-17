const express=require('express');
const app=express();
const fs = require('fs');
const path=require('path');
const db = require('./database');
const Booklist = require('./datasrc/booklistModel');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');

// Library > /api/library
// Book > /api/library/book
//

app.use(bodyParser.json());
app.use(express.static(__dirname + '/routes'));
app.use(bodyParser.urlencoded({extended: true}));

//app.get("/api/library", function(req, res) {
    //res.json({data: [{title: "Test", author: "Hans Zimmer", description: "", year: "2010", lent: true, lentBy: "Max" }] });
    //res.end();
//});

app.get("/api/library", async function(req, res){
    var obj = await Booklist.find(function (err, booklist) {
        if (err) return console.error(err);
        return booklist
    });
    res.status(200);
    await res.json({obj})
});

app.get("/api/library/newBook", (req, res) => {
    res.sendFile(__dirname + "/routes/newBook.html");
});

app.post("/addbook", (req, res) => {
    var newBook = new Booklist(req.body);
    newBook.save()
        .then(item => {
            res.send("Book saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

/*/new book:
app.post('/api/library/newBook', function(req,res){
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
    //return res.redirect('main.html');
}) ;
*/
app.listen(8080);
