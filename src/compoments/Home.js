
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import TodoService from '../services/todoService';
import useTodo from '../hooks/useTodo';

function Home(props) {

  const {todos, setTodos, addTodo, editTodo, deleteTodo} = useTodo();
  const [edit, setEdit] = useState(false);
  const [editedTodo, setEditTodo] = useState({});
  const todoService = new TodoService();

  function getTodos() {
    todoService.getTodos(props.email).then(res => {
      setTodos(res);
    })
  }

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line 
  }, []);


  function onSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    todoService.addTodo({name: name, description: 'soy dummy'})
      .then(res => {
        console.log(res);
        addTodo(res);
      })
    e.target.reset();
  }

  function onEdit(todo) {
    setEdit(true);
    setEditTodo(todo);
  }

  function onSubmitEdit(editedTodo) {

    // call api to edit row in db
    // replace that item in the list of todos
    editTodo(editedTodo);
    setEdit(false);
    setEditTodo({});
  } 

  function onDelete(id) {
    // call api to delete row in db
    // delete the item form the list of todos only if the api responds with success
    deleteTodo(id);
  }

  return (
    <div className="App">
      <TodoList todos={todos} onDelete={onDelete} onEdit={onEdit} />
      { edit ? 
        <EditTodo item={editedTodo} onSubmitEdit={onSubmitEdit} onCancel={() => setEdit(false)} /> 
        : <AddTodo onSubmit={onSubmit} /> }
    </div>
  );
}

export default Home;
