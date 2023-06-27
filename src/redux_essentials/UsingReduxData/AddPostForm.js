import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(e.target.value);
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId)); // postsSlice 에서 prepare 에 맞게 함수 인자 변경함
      setTitle('');
      setContent('');
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}