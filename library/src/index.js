const express=require('express');
const app=express();
const db = require('./database');
const Booklist = require('./datasrc/booklistModel');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/frontend'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/library", async function(req, res){
    var obj = await Booklist.find(function (err, booklist) {
        if (err) return console.error(err);
        return booklist
    });
    res.status(200);
    res.json(obj)
});

app.patch("/api/library/lend/:id/:lentBy", function(req, res) {
    Booklist.findByIdAndUpdate(
        req.params.id,
        { lent: true, lentBy: req.params.lentBy },
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.status(204).send(result);
            }
        }
    );
});

app.patch("/api/library/return/:id", function(req, res) {
    Booklist.findByIdAndUpdate(
        req.params.id,
        { lent: false, lentBy: "" },
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.status(204).send(result);
            }
        }
    );
});

app.post("/api/library/addbook", function(req, res) {
    var newBook = new Booklist(req.body);
    newBook.save()
        .then(item => {
            console.log("Book saved to database");
            res.status(203).send(newBook);
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

app.delete('/api/library/delete/:id', function(req, res) {
    Booklist.findByIdAndDelete(req.params.id, (err) => {
        if (err) return console.log(err);
        console.log(req.body);
        res.status(204).end()
    })
});


app.listen(8080);
