import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { Spinner } from "../../Spinner";
import { fetchPosts, selectPostById, selectPostIds } from "./postsSlice";

const PostExcerpt = React.memo(({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
});

export const PostsList = () => {
  const dispatch = useDispatch();

  // reaction 을 추가하면 posts 가 변경돼, PostsList 가 리렌더링 된다.
  // 따라서 모든 PostExcerpt 가 리렌더링되는 일이 발생한다.
  // 1. PostExcerpt 를 React.memo 로 props 가 변경돼야 바뀌도록 한다.
  // 2. PostExcerpt 를 postId 를 받게 하고, PostExcerpt 내부에서 id 를 통해 post 를 가져오게 한다.
  //    -> 정렬해야하기 때문에 까다롭다.
  // 3. 배열을 항상 정렬된 상태로 유지하도록 postsSlice 를 업데이트하고, 컴포넌트에서 정렬할 필요가 없게 한다.
  //    useSelector(selectPostㅑds, shallowEqual) 를 이용하여, id 배열의 내용이 변경되지 않는 경우, 다시 렌더링하지 않도록 한다. 별도의 id 배열이 있어야 한다. 
  // 4. createEntityAdapter 를 이용한다.
  // const posts = useSelector(selectAllPosts);
  const orderedPosts = useSelector(selectPostIds);
  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, postStatus])

  let content;
  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    content = orderedPosts.map(postId => <PostExcerpt key={postId} postId={postId} />)
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

/**
 * 데이터 정규화
 * id 로 값을 찾기 위해 array.find() 로 찾는 것은 오래 걸린다.
 * 반복할 필요 없이 id를 object key 로 설정한다.
 * 
 * createEntityAdapter 가 { ids: [], entities: {} } 형태로 데이터를 저장해준다.
 * 정규화를 직접 관리하기 위해 코드를 작성할 필요가 없다.
 * createEntityAdapter 가 제공하는 reducer 로 기본적인 처리와, 정렬된 순서로 ID 배열 유지, 항목 추가/제거/재정렬 시 업데이트 등을 한다.
 * sortComparer 메서드로 정렬 시 compare
 */

const normalizedState = {
  users: {
    ids: ["user1", "user2", "user3"],
    entities: {
      user1: { id: "user1", firstName: "firstName1", lastName: "lastName1"},
      user2: { id: "user2", firstName: "firstName2", lastName: "lastName2"},
      user3: { id: "user3", firstName: "firstName3", lastName: "lastName3"},
    }
  }
}