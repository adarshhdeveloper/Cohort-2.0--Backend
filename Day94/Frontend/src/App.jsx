import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [todo,setTodo] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/api/todo')
    .then((res)=>{
        setTodo(res.data.todoList)
    })
  },[])
  return (
    <div>
      {
        todo.map((list,idx)=>{
          return  <div className='list' key={idx}>
              <li key={idx}>{list.desc}</li>  
          </div>
        })
      }
    </div>
  )
}

export default App
