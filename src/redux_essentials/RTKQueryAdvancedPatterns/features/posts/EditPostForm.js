import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom"
import { useEditPostMutation, useGetPostQuery } from "../api/apiSlice";

export const EditPostForm = () => {
  const { params: { postId } } = useMatch("/editPost/:postId");
  const post = useGetPostQuery(postId);
  const [updatePost, { isLoading }] = useEditPostMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  }
  const onContentChanged = (e) => {
    setContent(e.target.value);
  }
  const onSavePostClicked = (e) => {
    if (title && content) {
      updatePost({ id: postId, title, content });
      navigate(`/posts/${postId}`);  
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}