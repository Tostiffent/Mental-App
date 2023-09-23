import { Post } from "@/lib/postSlice";
import styles from "./resources.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <div className={styles.postArea}>
      {posts.map((post) => (
        <Link key={post.title} href={`/resources/${post?.post_id}`}>
          <div style={{ cursor: "pointer" }} className={styles.postCard}>
            <div className={styles.thumbnail}>
              <Image
                src={post.thumbnail}
                fill={true}
                alt={post.title}
                style={{ borderRadius: "10px 10px 0px 0px" }}
              />
            </div>
            <div className={styles.details}>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  marginLeft: "10px",
                }}
              >
                {post.title}
              </span>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  marginLeft: "10px",
                }}
              >
                {post.desc}
              </span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "200",
                    marginLeft: "10px",
                  }}
                >
                  {post.author}
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "800",
                    marginRight: "10px",
                    color: "orange",
                    cursor: "pointer",
                  }}
                >
                  Read
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
