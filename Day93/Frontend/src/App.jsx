import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [notes, setNotes] = useState([
    {
      title: 'test title1',
      desc: 'test desc1'
    },
    {
      title: 'test title2',
      desc: 'test desc2'
    },
    {
      title: 'test title3',
      desc: 'test desc3'
    },
    {
      title: 'test title4',
      desc: 'test desc4'
    }
  ])
  //Fetch Notes
  function fetchNotes () {
    axios.get('http://localhost:3000/notes').then(res => {
      setNotes(res.data.notes)
    })
  }
  useEffect(() => {
    fetchNotes()
  }, [])

  //create Notes
  function handleSubmit (e) {
    e.preventDefault()
    const { title, desc } = e.target
    console.log(title.value, desc.value)
    axios
      .post('http://localhost:3000/notes', {
        title: title.value,
        desc: desc.value
      })
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })
      
  }


  //Delete Button 
  function handleDeleteNote(noteId){
    axios.delete('http://localhost:3000/notes/'+noteId)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }
  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type='text' placeholder='title' />
        <input name='desc' type='text' placeholder='desc' />
        <button>Create Note</button>
      </form>

      <div className='notes'>
        {notes.map((note, idx) => {
          return (
            <div className='note' key={idx}>
              <h1>{note.title}</h1>
              <p>{note.desc}</p>
              <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
