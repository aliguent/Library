const express=require('express');
const app=express();
const db = require('./database');
const Booklist = require('./datasrc/booklistModel');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');

// Library > /api/library
// Book > /api/library/book
//

app.use(bodyParser.json());
app.use(express.static(__dirname + '/frontend'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/library", async function(req, res){
    var obj = await Booklist.find(function (err, booklist) {
        if (err) return console.error(err);
        return booklist
    });
    res.status(200);
    await res.json({obj})
});

app.post("/api/library/addbook", (req, res) => {
    var newBook = new Booklist(req.body);
    newBook.save()
        .then(item => {
            console.log("Book saved to database");
            res.redirect("/")
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

app.delete('/api/library/delete/:id', (req, res) => {
    Booklist.findByIdAndDelete(req.params.id, (err) => {
        if (err) return console.log(err);
        console.log(req.body);
        res.status(204).end()
    })
});


app.listen(8080);
