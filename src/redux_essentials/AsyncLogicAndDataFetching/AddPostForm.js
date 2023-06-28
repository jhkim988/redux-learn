import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(e.target.value);
  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');

        // createAsyncThunk 는 에러를 내부적으로 처리하지만, unwrap() 메서드를 통해 외부(현재 컴포넌트)에서 처리할 수 있다.
        await dispatch(addNewPost({ title, content, user: userId })).unwrap(); 
        
        setTitle('');
        setContent('');  
        setUserId('');
      } catch (err) {
        console.error(`Failed to save the post: ${err}`);
      } finally {
        setAddRequestStatus('idle');
      }
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