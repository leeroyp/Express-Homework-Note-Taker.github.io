
var express = require("express");
var path = require("path");
var app = express();
let notes = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 7000;

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
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "view.html"));
//   });

//   app.get("/api/notes", function(req, res) {
//     res.sendFile(path.join(__dirname, "add.html"));
//   });

//   app.post("/api/notes", function(req, res) {
//     var newCharacter = req.body;
//     newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
//     console.log(newCharacter);
//     characters.push(newCharacter);
//     res.json(newCharacter);
//   });

//   app.post("/api/notes/:id", function(req, res){

//   })

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
