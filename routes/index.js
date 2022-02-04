//import all routes
//set the app express route for routes
// export app so I can use them outside

const express = require('express');
const app = express();

const notesRouter = require('./notes.js');

app.use('/notes', notesRouter);

module.exports = app;

