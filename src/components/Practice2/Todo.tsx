import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import '../../index.css';
import { todoList } from './constants';
import Header from '../Header';
import Footer from '../Footer';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const useThrottle = (callback: () => void, delay: number) => {
  const throttleRef = useRef(false);
  return useCallback(() => {
    if (!throttleRef.current) {
      callback();
      throttleRef.current = true;
      setTimeout(() => {
        throttleRef.current = false;
      }, delay);
    }
  }, [callback, delay]);
};

function Todo() {
  const [todos] = useState(todoList);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [scrollCount, setScrollCount] = useState<number>(1);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 디바운싱 미적용
  const filteredTodos = todos.filter((todo) => todo.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log('검색어: ', searchTerm);

  const visibleTodos = filteredTodos.slice(0, visibleCount);

  // 쓰로틀링 미적용
  const handleScroll = () => {
    console.log(scrollCount, '번 째 스크롤 이벤트 발생!');
    setScrollCount((prev) => prev + 1);

    const container = scrollContainerRef.current;
    if (container) {
      if (container.clientHeight + container.scrollTop + 100 >= container.scrollHeight) {
        if (visibleCount < filteredTodos.length) {
          setVisibleCount((prevCount) => prevCount + 16);
        }
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // 디바운싱 적용
  /*   const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredTodos = useMemo(() => {
    console.log(`검색어 : "${debouncedSearchTerm}"`);
    return todos.filter((todo) => todo.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
  }, [todos, debouncedSearchTerm]);

  const visibleTodos = useMemo(() => filteredTodos.slice(0, visibleCount), [filteredTodos, visibleCount]); */

  // 쓰로틀링 적용
  /* const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      if (container.clientHeight + container.scrollTop + 100 >= container.scrollHeight) {
        if (visibleCount < filteredTodos.length) {
          console.log(scrollCount, '번 째 스크롤 이벤트 발생!');
          setScrollCount((prev) => prev + 1);
          setVisibleCount((prevCount) => prevCount + 16);
        }
      }
    }
  }, [visibleCount, filteredTodos.length, scrollCount]);

  const throttledScrollHandler = useThrottle(handleScroll, 300);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', throttledScrollHandler);
      return () => container.removeEventListener('scroll', throttledScrollHandler);
    }
  }, [throttledScrollHandler]); */

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-slate-100 min-h-screen flex items-start justify-center pt-16 font-sans">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800">To-Do List 📝</h2>
          </div>

          <div>
            <input
              className="w-full px-4 py-2 text-slate-700 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="검색어 입력..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div
            className="w-full h-[400px] overflow-y-auto border border-slate-200 rounded-lg bg-white"
            ref={scrollContainerRef}
          >
            {visibleTodos.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 w-full border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition-colors duration-200"
              >
                <span className="text-slate-700">{todo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Todo;
