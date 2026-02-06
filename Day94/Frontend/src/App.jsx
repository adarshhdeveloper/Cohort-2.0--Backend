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
    axios.get('http://localhost:3000/api/todo').then(res => {
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
      .post('http://localhost:3000/api/todo', {
        desc: desc.value
      })
      .then(res => {
        console.log(res.data)
        fetchTodoList()
      })
  }

  //delte list 
 function handaleDelteTodo(listId){
   axios.delete('http://localhost:3000/api/todo/'+listId)
   .then(res=>console.log(res.data),fetchTodoList())
 }
  return (
    <>
      <form onSubmit={handleForm}>
        <input name='desc' type='text' placeholder='Enter Todo ' value={} />
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
              <li key={idx}>{list.desc}</li>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
