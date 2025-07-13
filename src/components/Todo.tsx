import React, { useState } from 'react';
import '../index.css';

function Todo() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const addTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input !== '') {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  const deleteTodo = (index: number): void => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="flex flex-col items-center jusitfy-center">
      <span className="text-[50px] mt-[10px] text-[#4e4ef6]">Todo List</span>
      <form onSubmit={addTodo}>
        <div className="flex items-center">
          <input
            className="p-[10px] mr-[10px] border-[1px] border-solid rounded-[5px] outline-none"
            placeholder="입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="p-[10px] border-none rounded-[5px] cursor-pointer bg-blue-500 text-white" type="submit">
            Add Todo
          </button>
        </div>
      </form>
      {todos.map((todo, index) => (
        <div className="flex items-center justify-between p-[10px] w-[300px] mt-[5px]">
          <span>{todo}</span>
          <button className="cursor-pointer" onClick={() => deleteTodo(index)}></button>
        </div>
      ))}
    </div>
  );
}

export default Todo;
