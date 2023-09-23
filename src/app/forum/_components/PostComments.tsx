import styles from "./ForumArea.module.scss";
import Comment from "./Comment";

export default function PostComments({ comments }: { comments: any[] }) {
  return (
    <div className={styles.postCardFull}>
      <div className={styles.postComment}>
        {comments
          ? comments.map((comment: any) => (
              <>
                <div style={{ borderLeft: "1px solid #535353" }} key={comment?.message_id}>
                  <Comment comment={comment} reply={null} />
                  <div style={{ marginLeft: "80px", borderLeft: "1px solid #535353" }}>
                    {comment?.reply && Array.isArray(comment?.reply)
                      ? comment?.reply?.map((reply: any) => (
                          <Comment key={reply?.message_id} reply={reply?.reply} comment={reply} />
                        ))
                      : null}
                  </div>
                </div>
              </>
            ))
          : null}
      </div>
      <style jsx>{`
        .divider {
          width: 100%;
          height: 2px;
          background-color: #3c3c3c;
          margin-bottom: 10px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
