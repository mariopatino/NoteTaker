const express = require('express');
const path = require('path');

const fs = require('fs');
const notesDB = require('./db/db.json');

const routes = require('./routes/index');
const { response } = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));



//express().Router;
app.use('/api', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });


app.listen(PORT, () =>{
    console.log(`Application is running on http://localhost:${PORT}`)
})