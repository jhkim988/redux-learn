import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./redux_essentials/UsingReduxData/Navbar";
import { AddPostForm } from './redux_essentials/AsyncLogicAndDataFetching/AddPostForm';
import { PostsList } from './redux_essentials/AsyncLogicAndDataFetching/PostsList';
import { SinglePostPage } from './redux_essentials/AsyncLogicAndDataFetching/SinglePostPage';
import { EditPostForm } from './redux_essentials/AsyncLogicAndDataFetching/EditPostForm';

function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={
            <>
              <AddPostForm />
              <PostsList />
            </>
          }/>
          <Route exact path="/posts/:postId" element={<SinglePostPage/>} />
          <Route exact path="/editPost/:postId" element={<EditPostForm/>} />
        </Routes>
      </Router>
  );
}

export default App;
