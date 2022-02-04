const notesRouter = require('express').Router();

const path = require('path');
const fs = require('fs');
const notesDB = require('../db/db.json')

function saveDB(noteToAdd){
    fs.writeFileSync('./db/db.json', JSON.stringify(noteToAdd));
}


notesRouter.get('/',(req, res) => {
    res.json(notesDB);
});


notesRouter.post('/', (req, res) => {
    if(!req.body){
        res.status(500).json({error:'You forgot to send the note'});
        return;
    } 
    const newNote = {
        ...req.body,
        id: new Date().getTime()
    };
    notesDB.push(newNote);
    saveDB(notesDB);
    res.status(201).json(newNote);
});

notesRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = notesDB.findIndex(note => String(note.id) == String(id));
    if (index < 0){
        res.status(500).json({error:'Note not found'});
        return;
    }
    notesDB.splice(index,1);
    saveDB(notesDB);
    res.status(200).json(notesDB);
});

module.exports = notesRouter;