import { useReducer, useRef } from "react";

const initState = {
  tod: '',
  todoList: []
}

const SET_TODO = 'set_todo';
const SET_LIST_TODO = 'set_list_todo';
const DELETE_TODO = 'delete_todo';

const reducer = (state, action) => {
  console.log(action)

  let newState;
  switch (action.type) {

    case SET_TODO:
      newState =  {
          ...state,
          tod: action.payload
        }
      break;
    case SET_LIST_TODO:
      newState =  {
        ...state,
        todoList: [...state.todoList, action.payload]
      }
        break;
      case DELETE_TODO:
        const newTodoList = [...state.todoList]
        newTodoList.splice(action.payload, 1);
          newState =  {
            ...state,
            todoList: newTodoList
          }
          break;
    default:
      throw Error('INVALID ACTION')
      break;
  }
  console.log(newState)
  return newState;
}

const setTodo = payload => {
  return {
    type: SET_TODO,
    payload
  }
};

const setTodoList = payload => {
  return {
    type: SET_LIST_TODO,
    payload
  }
};
const deleteTodo = payload => {
  return {
    type: DELETE_TODO,
    payload
  }
  
};
function App() {
  const inputRef = useRef();
  const [state, dispatch] = useReducer(reducer, initState);
  const { tod, todoList } = state;

  const handleSubmit = () => {
      dispatch(setTodoList(tod));
      

      // inputRef.current.focus();
  }

 return(
  <div>
    <input  value={tod} onChange={e => dispatch(setTodo(e.target.value))} placeholder="Add some text..." />
    <button onClick={handleSubmit}>Add</button>
      <ul>
        {
          todoList.map((tod, index) => (

            <li key={index}> {tod} <span onClick={() => dispatch(deleteTodo(index))}>
              
                &times;
              </span> </li>

          ))

        }
      </ul>
  </div>
 )
}

export default App;
