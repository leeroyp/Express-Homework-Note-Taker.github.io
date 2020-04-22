const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
let notes = require("./db/db.json");
// const util = require("util");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 0004;

app.use(express.static("public"));

app.get("/api/notes", function (req, res) {
    res.json(notes);
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/api/notes", function (req, res) {
    var newNotes = req.body;
    notes.push(req.body);
    req.body.id = notes.length;
    res.json(notes);
    fs.writeFile(("./db/db.json"), newNotes, function (err, data) {
        if (err) throw err;
    });
})

app.delete("/api/notes/:id", function (req, res) { 
    notes = notes.filter(function(note) {
        return note.id != req.params.id;
      });
    fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
        if(err) {
            throw err;
        }
    })
    return res.json(false);
});

app.listen(PORT, function () {
    console.log(`App is listening on PORT: ${PORT}`)
});
