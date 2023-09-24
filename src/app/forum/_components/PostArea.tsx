"use client";
import styles from "./ForumArea.module.scss";
import PostComments from "./PostComments";
import CommentBox from "./commentBox";
import PostAreaCard from "./postAreaCard";

export default function PostArea({ post }: { post: any }) {
  return (
    <div className={styles.forumContainer}>
      <PostAreaCard post={post} />
      <CommentBox />
      <PostComments comments={post?.comments} />
    </div>
  );
}
