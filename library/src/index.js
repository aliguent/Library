const express=require('express');
const app=express();
const db = require('./database');
const Booklist = require('./datasrc/booklistModel');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const bookRouter = require('./bookRouter');
const server = require('./datasrc/schema');

server.applyMiddleware({app:app});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/frontend'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/library', bookRouter);

app.listen(8080);
