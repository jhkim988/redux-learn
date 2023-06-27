import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddPostForm } from './redux_essentials/UsingReduxData/AddPostForm';
import { SinglePostPage } from "./redux_essentials/UsingReduxData/SinglePostPage";
import { PostsList } from './redux_essentials/UsingReduxData/PostsList';
import { Navbar } from './redux_essentials/UsingReduxData/Navbar';
import { EditPostForm } from './redux_essentials/UsingReduxData/EditPostForm';

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
