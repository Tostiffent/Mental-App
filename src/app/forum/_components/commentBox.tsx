"use client";
import { useAppSelector } from "@/lib/reduxHooks";
import styles from "./ForumArea.module.scss";
import { useState } from "react";
import { commentSend } from "@/lib/api";

export default function CommentBox() {
  const [comment, setComment] = useState<string>("");
  const auth = useAppSelector((state) => state.auth);
  const post = useAppSelector((state) => state.forumData.currentPost);

  async function onComment() {
    commentSend(post?.post_id ?? "123", comment, auth.data.user_id);
    setComment("");
  }

  return (
    <div>
      <input
        className={styles.commentBox}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comment something"
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            onComment();
          }
        }}
      />
    </div>
  );
}
