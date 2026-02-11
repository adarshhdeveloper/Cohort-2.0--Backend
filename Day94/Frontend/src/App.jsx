import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [list, setList] = useState([
    {
      desc: 'All List Will Be Displat Here '
    } 
  ])

  //fetch todo list
  function fetchTodoList () {
    axios.get('https://todo-app-isr4.onrender.com/api/todo').then(res => {
      setList(res.data.todoList)
    })
  }
  useEffect(() => {
    fetchTodoList()
  }, [])

  //form handle   ans create todo note
  function handleForm (e) {
    e.preventDefault()
    const { desc } = e.target
    axios
      .post('https://todo-app-isr4.onrender.com/api/todo', {
        desc: desc.value
      })
      .then(res => {
        console.log(res.data)
        desc.value=''
        fetchTodoList()
      })
  }

  //delte list 
 function handaleDelteTodo(listId){
   axios.delete('https://todo-app-isr4.onrender.com/api/todo/'+listId)
    .then(res => {
        console.log(res.data)
        fetchTodoList()
      })
 }
 //Update Todo 
 function handleUpdateTodo(listId){
  axios.patch('https://todo-app-isr4.onrender.com/api/todo/'+listId,{desc:'Updated'})
  .then(res => {
        console.log(res.data)
        fetchTodoList()
      })
 }
  return (
    <>
      <form onSubmit={handleForm}>
        <input name='desc' type='text' placeholder='Enter Todo '  />
        <button>Create Todo</button>
      </form>

      <div className='lists'>
        {list.map((list, idx) => {
          return (
            <div className='list' key={idx}>
              <input type='checkbox' />
              <button onClick={()=>handaleDelteTodo(list._id)}>
                <i className='ri-delete-bin-2-line'></i>
              </button>
              <button onClick={()=>handleUpdateTodo(list._id)}>
                <i className="ri-edit-fill"></i>
              </button>
              <li key={idx}>{list.desc}</li>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
