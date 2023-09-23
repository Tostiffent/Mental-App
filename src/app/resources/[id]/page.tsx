"use client";
import Image from "next/image";
import styles from "./post.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { getPost } from "@/lib/postSlice";

export default function Page(props: { params: { id: String } }) {
  const post = useAppSelector((state) => state.postSlice.currentPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPost(props.params.id));
  }, []);

  return (
    <>
      {post ? (
        <div className={styles.container}>
          <div className={styles.titleBar}>
            <div className={styles.thumbnail}>
              <Image src={post?.thumbnail} alt={post?.title} fill={true} />
            </div>
            <span style={{ fontSize: "35px", fontWeight: "600" }}>
              {post?.title}
            </span>
            <span style={{ color: "#757575", fontWeight: "500" }}>
              {`${post.author} in ${post.type}`}
            </span>
          </div>
          <div className={styles.content}>
            <p>{post?.content}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
