"use client";
import Image from "next/image";
import styles from "./resources.module.css";
import { useEffect, useState } from "react";
import Posts from "./posts";
import { getPosts } from "@/lib/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";

export default function Page() {
  const [selection, setSelection] = useState<String>("MH");
  const posts = useAppSelector((state) => state.postSlice.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts(selection));
  }, [selection]);

  const topics = [
    {
      name: "Mental Health",
      tag: "MH",
      image:
        "https://media.discordapp.net/attachments/1154724255859216435/1155302041363689604/3485379-200.png",
    },
    {
      name: "Mental illnesses",
      tag: "MI",
      image:
        "https://media.discordapp.net/attachments/1154724255859216435/1155302460970250311/Mental_Illness_Icon_2.png?width=368&height=473",
    },
    {
      name: "Digital age problems",
      tag: "MID",
      image:
        "https://media.discordapp.net/attachments/1154724255859216435/1155302687554949151/191.png?width=473&height=473",
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "var(--background-primary)",
      }}
    >
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <span>
            {selection
              ? `Viewing Posts for ${selection}`
              : "Select Your Condition"}
          </span>
        </div>
        <div className={styles.conditions}>
          {topics.map((topic) => (
            <div
              onClick={() => setSelection(topic.tag)}
              key={topic.name}
              className={styles.condition}
            >
              <div
                style={{ width: "50px", height: "50px", position: "relative" }}
              >
                <Image
                  alt={topic.name}
                  src={topic.image}
                  fill={true}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <span style={{ marginTop: "10px", fontWeight: "600" }}>
                {topic.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {posts[0] ? <Posts posts={posts} /> : null}
    </div>
  );
}
