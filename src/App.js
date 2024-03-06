import { useState } from "react";

function App() {
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState(() => {
    const jsonTodo =  JSON.parse(localStorage.getItem('todoList')) ?? []
    return jsonTodo;
  });

  const handleSubmit = (todo) => {
    setTodoList(prevTodo => {
      const saveTodo = [...prevTodo, todo];

      const newjsonTodo = JSON.stringify(saveTodo);
     
      localStorage.setItem('todoList', newjsonTodo);
      return saveTodo;
    })
    setInput('');
  }

  const handleDone = (done) => {
    setTodoList(() => {

      const newTodo = todoList.filter(item => item !== done);
      const newjsonTodo = JSON.stringify(newTodo);
      localStorage.setItem('todoList', newjsonTodo);
    return newTodo;
    })

  }

  return (
    <div style={{ padding: 30}}>
      <input value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={() => handleSubmit(input)}>add</button>

      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>{todo} <button onClick={() => handleDone(todo)}>v</button></li>
        ))}
       
      </ul>
    </div>
  );
}

export default App;
