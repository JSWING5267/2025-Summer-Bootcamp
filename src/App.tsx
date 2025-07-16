import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todo from './components/Practice2/Todo';
import Blog from './components/Practice1/Blog';
import BlogDetail from './components/Practice1/BlogDetail';
//import { Suspense, lazy } from 'react';

//const BlogDetail = lazy(() => import('./components/Practice1/BlogDetail'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <a href="/blog" className="hover:underline">
                실습 1
              </a>
              <a href="/todo" className="hover:underline">
                실습 2
              </a>
            </>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/todo" element={<Todo />} />
        <Route
          path="/blog/:id"
          element={
            //<Suspense fallback={<div>Loading...</div>}>
            <BlogDetail />
            //</Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
