"use client";
import styles from "./ForumArea.module.scss";
import PostCard from "./PostCard";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CreatePost from "./CreatePost";
import { useState } from "react";

export default function ForumArea({ posts }: { posts: any }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.forumContainer}>
      {openModal ? <CreatePost setOpenModal={setOpenModal} /> : null}
      <div className={styles.topText}>
        <div
          style={{
            width: "50px",
            height: "50px",
            position: "relative",
            marginRight: "15px",
          }}
        >
          <Image
            alt="top img"
            fill={true}
            src={
              "https://media.discordapp.net/attachments/1154724255859216435/1155163087104647309/image.png"
            }
            style={{ borderRadius: "10px" }}
          />
        </div>
        {`Mindscape Forum`}
      </div>
      <div className={styles.searchBar}>
        <input
          className={styles.searchBox}
          type="text"
          placeholder="search posts"
        />
        <button
          onClick={() => setOpenModal(true)}
          className={styles.createButton}
        >
          Create Post
        </button>
      </div>
      {posts
        ? posts?.map((post: any) => (
            <div
              key={post?.post_id}
              onClick={() => router.push(`/forum/${post?.post_id}`)}
            >
              <PostCard post={post} />
            </div>
          ))
        : null}
    </div>
  );
}
