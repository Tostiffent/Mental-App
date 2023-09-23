"use client";
import Image from "next/image";
import styles from "./resources.module.css";
import { useEffect, useState } from "react";
import Posts from "./posts";
import { getPosts } from "@/lib/postSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";

export default function Page() {
  const [selection, setSelection] = useState<String>("");
  const posts = useAppSelector((state) => state.postSlice.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts(selection));
  }, [selection]);

  const topics = [
    {
      name: "harizzment",
      image:
        "https://media.discordapp.net/attachments/1154724255859216435/1155015696296710164/768px-Heart_corazC3B3n.png?width=473&height=473",
    },
    {
      name: "pressure",
      image:
        "https://media.discordapp.net/attachments/1154724255859216435/1155015696296710164/768px-Heart_corazC3B3n.png?width=473&height=473",
    },
    {
      name: "overload",
      image:
        "https://media.discordapp.net/attachments/1154724255859216435/1155015696296710164/768px-Heart_corazC3B3n.png?width=473&height=473",
    },
  ];

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <span>
            {selection
              ? `Viewingg Posts for ${selection}`
              : "Select Your Condition"}
          </span>
        </div>
        <div className={styles.conditions}>
          {topics.map((topic) => (
            <div key={topic.name} className={styles.condition}>
              <div
                onClick={() => setSelection(topic.name)}
                style={{ width: "50px", height: "50px", position: "relative" }}
              >
                <Image
                  alt={topic.name}
                  src={topic.image}
                  fill={true}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <span style={{ marginTop: "10px" }}>{topic.name}</span>
            </div>
          ))}
        </div>
      </div>
      {posts[0] ? <Posts posts={posts} /> : null}
    </div>
  );
}
