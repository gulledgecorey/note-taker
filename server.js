const express = require('express');
const path = require('path');
const notes = require("./db/db.json")
const PORT = process.env.PORT || 3001;
const fs = require("fs")
const app = express();
// new comment

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.json(notes)
);

app.post('/api/notes', (req, res) =>{
    req.body.id=Math.floor(Math.random()*1000000)
    notes.push(req.body)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
  res.json(notes)
}
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);