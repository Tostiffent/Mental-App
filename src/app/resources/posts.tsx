import styles from "./resources.module.css";
import Image from "next/image";

export default function Posts({ selection }: { selection: String }) {
  const posts = [
    {
      title: "Welcome To Mental App",
      thumbnail:
        "https://media.discordapp.net/attachments/1154724255859216435/1155033222950948974/image.png",
      author: "girl (real)",
      desc: "Welcome to this app we have made for this hackathon",
    },
    {
      title: "hello world",
      thumbnail:
        "https://media.discordapp.net/attachments/1154724255859216435/1155021249534242876/image.png?width=1025&height=462",
      author: "girl (real)",
      desc: "Hello to this new stupid af world",
    },
    {
      title: "hello world",
      thumbnail:
        "https://media.discordapp.net/attachments/1154724255859216435/1155021249534242876/image.png?width=1025&height=462",
      author: "girl (real)",
      desc: "Hello to this new stupid af world",
    },
    {
      title: "hello world",
      thumbnail:
        "https://media.discordapp.net/attachments/1154724255859216435/1155021249534242876/image.png?width=1025&height=462",
      author: "girl (real)",
      desc: "Hello to this new stupid af world",
    },
    {
      title: "hello world",
      thumbnail:
        "https://media.discordapp.net/attachments/1154724255859216435/1155021249534242876/image.png?width=1025&height=462",
      author: "girl (real)",
      desc: "Hello to this new stupid af world",
    },
  ];

  return (
    <div className={styles.postArea}>
      {posts.map((post) => (
        <div key={post.title} className={styles.postCard}>
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
      ))}
    </div>
  );
}
