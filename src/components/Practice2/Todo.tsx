import { useState, useEffect, useMemo } from 'react';
import '../../index.css';
import { todoList } from './constants';

function Todo() {
  const [todos] = useState(todoList);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const [visibleCount, setVisibleCount] = useState<number>(20);

  const filteredTodos = useMemo(() => {
    console.log(searchTerm);
    return todos.filter((todo) => todo.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [todos, searchTerm]);

  const visibleTodos = useMemo(() => filteredTodos.slice(0, visibleCount), [filteredTodos, visibleCount]);

  const handleScroll = () => {
    console.log('Scroll event fired! (Too many times)');
    if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight) {
      if (visibleCount < filteredTodos.length) {
        setVisibleCount((prevCount) => prevCount + 20);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredTodos.length]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">To do list</h2>

      <div className="mb-5">
        <input
          className="p-[10px] border-[1px] border-solid rounded-[5px] outline-none w-[320px]"
          placeholder="검색어 입력 (최적화 전)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-[320px] h-[400px] overflow-y-auto border rounded p-2">
        {visibleTodos.map((todo, index) => (
          <div key={index} className="flex items-center justify-between p-[10px] w-full mt-[5px] border rounded">
            <span>{todo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
