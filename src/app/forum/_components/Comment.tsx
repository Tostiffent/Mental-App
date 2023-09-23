import Image from "next/image";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import styles from "./ForumArea.module.scss";
import { Message } from "@/lib/types";

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

export default function Comment({
  comment,
  reply,
}: {
  comment: any;
  reply: Message | null;
}) {
  return (
    <div>
      {reply ? (
        <div className="replyBox">
          <div className="replyAvatar">
            <Image
              src={
                "https://cdn.discordapp.com/avatars/621324161914109952/78b2d153be1a108a4ef2245d7d6b753c.webp?size=80"
              }
              alt="pfp"
              fill={true}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <span
            style={{
              fontWeight: "600",
              marginLeft: "5px",
              whiteSpace: "nowrap",
            }}
          >
            @{reply?.author?.username ? reply?.author?.username : ""}
          </span>
          <span className="replyTxt">
            {reply?.content != ""
              ? reply?.content
              : "replied to this attachment"}
          </span>
        </div>
      ) : null}
      <div
        key={comment?.message_id}
        style={{ marginTop: "9px", minHeight: "0px" }}
        className="message"
      >
        <div className="message_avatar">
          <Image
            src={
              "https://cdn.discordapp.com/avatars/621324161914109952/78b2d153be1a108a4ef2245d7d6b753c.webp?size=80"
            }
            alt="pfp"
            fill={true}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="message_data">
          <div className="message_author" style={{ marginBottom: "1px" }}>
            {comment?.author?.username}
            <span className="message_timestamp">
              {getTime(comment?.createdAt)}
            </span>
          </div>
          <div className="message_content">{comment?.content}</div>
        </div>
      </div>
      <div
        className={styles.buttonContainer}
        style={{ marginLeft: "41px", fontSize: "22px" }}
      >
        <ThumbUpOutlinedIcon
          fontSize="inherit"
          style={{ marginRight: "20px", color: "#ff8383", cursor: "pointer" }}
        />
        <ThumbDownOutlinedIcon
          fontSize="inherit"
          style={{ marginRight: "20px", color: "#c6c6ff", cursor: "pointer" }}
        />
        <ReplyOutlinedIcon
          fontSize="inherit"
          style={{ marginRight: "20px", cursor: "pointer" }}
        />
      </div>
      <style jsx>{`
        .messageContainer {
          position: relative;
          word-wrap: break-word;
        }

        .divider {
          width: 100%;
          height: 2px;
          background-color: #3c3c3c;
          margin-bottom: 10px;
          margin-top: 10px;
        }

        .message {
          display: flex;
          flex-direction: row;
          border-radius: 2px;
          min-height: 45px;
          margin-top: 19px;
          max-width: 100%;
        }

        .message_content {
          max-width: 90%;
          word-wrap: break-word;
        }

        .messageContainer:hover {
          background-color: var(--background-secondary);
        }

        .message_avatar {
          margin-left: 17px;
          margin-right: 13px;
          width: 40px;
          height: 40px;
          aspect-ratio: 1;
          position: relative;
          cursor: pointer;
        }

        .message_data {
          height: 100%;
          min-width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }
        .message_timestamp {
          margin-left: 10px;
          margin-bottom: 18px;
          color: #828282;
          font-size: 0.9rem;
        }
        .small_message {
          max-width: 100%;
          word-wrap: break-word;
          padding-bottom: 5px;
          padding-left: 70px;
          position: relative;
        }

        .small_message:hover {
          background-color: var(--background-secondary);
        }

        .imageContainer {
          max-width: 33vw;
          max-height: 40vh;
          margin-left: 70px;
          cursor: pointer;
        }

        .videoContainer {
          heigth: auto;
          max-height: 53vh;
          margin-left: 70px;
          cursor: pointer;
          position: relative;
        }

        .img {
          position: relative;
          max-width: 100%;
          max-height: 100%;
          border-radius: var(--border-radius);
        }

        .replyBox {
          display: flex;
          flex-direction: row;
          align-items: center;
          min-width: 70%;
          margin-left: 70px;
          min-height: 20px;
          max-width: 70%;
          max-height: 20px;
          font-size: 13px;
          margin-top: 9px;
        }

        .replyAvatar {
          position: relative;
          min-width: 20px;
          min-height: 20px;
          background-color: var(--background-primary);
          border-radius: 50px;
        }

        .replyTxt {
          margin-left: 5px;
          cursor: pointer;
          overflow: hidden;
          height: 16px;
          width: 100%;
        }

        .replyTxt:hover {
          color: aliceblue;
        }

        .messageAction {
          min-width: 50px;
          max-width: 150px;
          min-height: 26px;
          position: absolute;
          margin-bottom: 40px;
          right: 0;
          margin-right: 10px;
          top: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }

        .actionButton {
          width: 50px;
          height: 100%;
          border: none;
          border-radius: none;
          border-radius: 2px;
          cursor: pointer;
          background-color: var(--background-primary);
        }

        .actionButton:hover {
          background-color: var(--foreground-primary);
          color: var(--background-secondary);
        }

        video {
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
