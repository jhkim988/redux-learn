import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./redux_essentials/RTKQueryAdvancedPatterns/Navbar";

import { AddPostForm } from './redux_essentials/RTKQueryAdvancedPatterns/features/posts/AddPostForm';
import { PostsList } from './redux_essentials/RTKQueryAdvancedPatterns/features/posts/PostsList';
import { SinglePostPage } from './redux_essentials/RTKQueryAdvancedPatterns/features/posts/SinglePostPage';
import { EditPostForm } from './redux_essentials/RTKQueryAdvancedPatterns/features/posts/EditPostForm';

import { UsersList } from "./redux_essentials/RTKQueryAdvancedPatterns/features/users/UserList";
import { UserPage } from "./redux_essentials/RTKQueryAdvancedPatterns/features/users/UserPage";

import { NotificationsList } from './redux_essentials/RTKQueryAdvancedPatterns/features/notifications/NotificationsList';

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
          <Route exact path="/users" element={<UsersList/>} />
          <Route exact path="/users/:userId" element={<UserPage/>} />
          <Route exact path="/notifications" element={<NotificationsList/>} />
        </Routes>
      </Router>
  );
}

export default App;
