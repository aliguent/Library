const db = require('./database');
const Booklist = require('./datasrc/booklistModel');
const mongoose = require('mongoose');
const express = require('express')
const bookRouter = express.Router();

bookRouter.get("/", async function(req, res){
    const obj = await Booklist.find(function (err, booklist) {
        if (err) return console.error(err);
        return booklist
    });
    res.status(200);
    res.json(obj)
});

bookRouter.patch("/lend", function(req, res) {
    Booklist.findByIdAndUpdate(
        req.body.id,
        { lent: true, lentBy: req.body.lentBy },
        function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.status(204).send(result);
            }
        }
    );
});

bookRouter.patch("/return/:id", function(req, res) {
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

bookRouter.post("/addbook", function(req, res) {
    let newBook = new Booklist(req.body);
    newBook.save()
        .then(item => {
            console.log("Book saved to database");
            res.status(203).send(newBook);
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

bookRouter.delete('/delete/:id', function(req, res) {
    Booklist.findByIdAndDelete(req.params.id, function(err) {
        if (err) return console.log(err);
        console.log(req.body);
        res.status(204).end()
    })
});

module.exports = bookRouter;