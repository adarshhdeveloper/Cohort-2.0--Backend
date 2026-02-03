const express = require("express")
const noteModel = require("./models/notes.model")
const cors = require("cors")

const app = express()

// ✅ Allow frontend (5173) to talk to backend (3000)
app.use(cors())

// ✅ JSON body read karne ke liye
app.use(express.json())

// 🔹 POST → frontend se note lene ke liye
app.post("/notes", async (req, res) => {
  const { description } = req.body  // 🔥 frontend se same name

  await noteModel.create({
    description
  })

  res.status(201).json({
    msg: "note created successfully"
  })
})

// 🔹 GET → frontend ko notes dene ke liye
app.get("/notes", async (req, res) => {
  const notes = await noteModel.find()

  // 🔥 sirf array bhej rahe hain (frontend simple rahe)
  res.status(200).json(notes)
})

module.exports = app
