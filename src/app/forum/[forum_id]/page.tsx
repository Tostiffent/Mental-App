"use client";
import { useEffect } from "react";
import ForumArea from "../_components/ForumArea";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { fetchForumPost, fetchForumPosts } from "@/lib/forumSlice";
import PostArea from "../_components/PostArea";

// <ForumArea posts={posts} forum_id={props.params.forum_id} />
//<PostArea post_id="1234567" forum_id={props.params.forum_id} />;

export default function Forum(props: { params: { forum_id: string } }) {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.forumData.currentPost);

  useEffect(() => {
    dispatch(fetchForumPost(props.params.forum_id));
  }, []);

  return <>{post ? <PostArea post={post} /> : null}</>;
}
