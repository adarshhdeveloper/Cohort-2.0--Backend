const express = require("express")
const app = express()
const notes = [
    // {
    //     title:
    //     description:
    // }
]
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servar is running... <br> Welcome User ')
})
//creating  notes 
app.post('/notes', (req, res) => {
    notes.push(...req.body)
    res.send('Notes created')
    console.log(notes)

})
//GET notes
app.get('/notes', (req, res) => {
    res.send(notes)
})

//Deleting Notes 
//Using index.params
// req.params.index
app.delete('/notes/:index', (req, res) => {
    delete notes[req.params.index]
    res.send('note Deleted')
    console.log("Note deleted")
})

//note update 
// partial update 
// data req.body ke andar hoga 
// app.patch('/notes/:index', (req, res) => {
//     notes[req.params.index].description = req.body.description
//     res.send("description updated")

//     console.log("Note updated successfully")
// })

app.patch('/notes/:index', (req, res) => {
  const index = req.params.index;
  const updates = req.body;   // jo fields user bheje

  let updatedFields = [];

  for (let key in updates) {
    if (notes[index][key] !== undefined) {
      notes[index][key] = updates[key];
      updatedFields.push(`${key} updated`);
    }
  }

  if (updatedFields.length === 0) {
    return res.status(400).send("No valid field updated");
  }

  res.send(updatedFields.join(", "));
});



//update hole field 
app.put('/notes/:index', (req, res) => {
    notes[req.params.index] = req.body
    res.send("Notes Updated")
})

module.exports = app