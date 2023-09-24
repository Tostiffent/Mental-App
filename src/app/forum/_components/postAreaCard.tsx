"use client";
import Image from "next/image";
import styles from "./ForumArea.module.scss";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useAppSelector } from "@/lib/reduxHooks";

function getTime(date_now: Date) {
  // get total seconds between the times
  var delta =
    Math.abs(new Date().getTime() - new Date(date_now).getTime()) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = delta % 60; // in theory the modulus is not required
  if (days) return `${days}d`;
  else if (hours) return `${hours}h ${minutes}m`;
  else if (minutes) return `${minutes}m ${seconds}s`;
  else if (seconds) return `${seconds}s`;
  else return `now`;
}

export default function PostAreaCard({ post }: { post: any }) {
  return (
    <div className={styles.postCardFull}>
      <div className={styles.postTitle}>
        <span className={styles.title}>{post?.title}</span>
      </div>
      <div className={styles.postAuthor}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.authorDetails}>
            <span style={{ fontWeight: "700", color: "#e7e7e7" }}>
              {post?.author?.username}
            </span>
            <span style={{ fontWeight: "450", color: "#a7a7a7" }}>
              {getTime(post?.createdAt)}
            </span>
          </div>
        </div>
        <div
          style={{
            padding: "12px",
            borderRadius: "10px",
            backgroundColor: "rgb(170 208 255)",
            color: "rgb(28, 91, 169)",
            fontWeight: "500",
          }}
        >
          General
        </div>
      </div>
      <div className={styles.postContentNoLimit}>{post?.content}</div>
    </div>
  );
}
