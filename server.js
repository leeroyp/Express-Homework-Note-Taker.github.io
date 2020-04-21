
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

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/api/notes", function (req, res) {
    var newNotes = req.body;
    notes.push(req.body);
    req.body.id = notes.length;
    res.json(notes);
   
   
    fs.writeFile(("./db/db.json"), storeNotes, function (err, data) {
        if (err) throw err;
    });
})






// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

// app.post("/api/notes", function (req, res) {
//     let newNotes = req.body;
//     res.json(newNotes);
// });