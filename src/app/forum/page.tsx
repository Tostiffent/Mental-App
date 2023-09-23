"use client";
import { useEffect } from "react";
import ForumArea from "./_components/ForumArea";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { fetchForumPosts } from "@/lib/forumSlice";

// <ForumArea posts={posts} forum_id={props.params.forum_id} />
//<PostArea post_id="1234567" forum_id={props.params.forum_id} />;

function isEmpty(obj: any) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
}

export default function Forum(props: { params: { forum_id: string } }) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.forumData.posts);
  const post = null;
  //const post = useAppSelector((state) => state.forumData.currentPost);

  useEffect(() => {
    dispatch(fetchForumPosts());
  }, []);

  return <>{!isEmpty(posts) && !post ? <ForumArea posts={posts} /> : null}</>;
}
