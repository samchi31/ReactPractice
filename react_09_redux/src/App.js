// import logo from './logo.svg';
// import './App.css';

import { Route, Routes } from "react-router-dom";
import CounterContainer from "./container/CounterContainer";
import PostListContainer from "./container/PostListContainer";
import TodosContainer from "./container/TodosContainer";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <div >
      <CounterContainer />
      <hr />
      <TodosContainer />
      <hr />
      {/* <PostListContainer /> */}
      <Routes>
        <Route exact path="/" element={<PostListPage />} />
        <Route path=":id" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
