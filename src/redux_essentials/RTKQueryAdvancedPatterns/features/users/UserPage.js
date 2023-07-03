import { useMemo } from "react";
import { useMatch, Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { selectUserById } from "./usersSlice";
import { selectAllPosts, selectPostsByUser } from "../posts/postsSlice";
import { useGetPostsQuery } from "../api/apiSlice";

export const UserPage = () => {
  const userId = useMatch("/users/:userId").params.userId;
  const user = useSelector(state => selectUserById(state, userId));

  // filter 때문에 useSelector 가 계속해서 다른 객체를 리턴한다. 따라서 리렌더링되는 문제가 있다.
  // createSelector 를 이용하여 해결할 수 있다.
  // const postsForUser = useSelector(state => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter(post => post.user === userId);
  // });

  // createSelector 를 이용하여 다시 렌더링되지 않게 한다.
  // const postsForUser = useSelector(selectPostsByUser);

  const selectPostsForUser = useMemo(() => {
    const emptyArray = [];
    return createSelector(
      res => res.data,
      (res, userId) => userId,
      (data, userId) => data?.filter(post => post.user === userId) ?? emptyArray
    )
  }, []);

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      postsForUser: selectPostsForUser(result, userId)
    })
  });

  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}