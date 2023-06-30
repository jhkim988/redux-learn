import { Link, useMatch } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { useGetPostQuery } from "../api/apiSlice";
import { Spinner } from "../../Spinner";

export const SinglePostPage = () => {
  const {
    params: { postId },
  } = useMatch("/posts/:postId");
  const {
    data: post,
    isLoading,
    isFetching,
    isSuccess,  
  } = useGetPostQuery(postId);

  let content;
  if (isLoading || isFetching) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    );
  }

  return <section>{content}</section>;
};
