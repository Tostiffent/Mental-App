import { RefObject, useState } from "react";

import { Message } from "@/lib/types";
import { search as searchEmojis } from "node-emoji";
import { isValidFileUploaded } from "@/lib/util";
import EmojiList from "@/components/EmojiList";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectMembersByGuildId } from "@/lib/slices/chatSlice";
import Image from "next/image";

export default function TextInputArea({
  inputRef,
  messageContent,
  placeholder,
  setMessageContent,
  setImageToUpload,
  onMessageSend,
}: {
  inputRef: RefObject<HTMLTextAreaElement>;
  messageContent: string;
  placeholder: string;
  setMessageContent: (msg: string) => void;
  setImageToUpload: (file: File | null) => void;
  onMessageSend: () => void;
}) {
  const [emojiSuggestions, setEmojiSuggestions] = useState<ReturnType<typeof searchEmojis> | null>(null);
  const [memberSuggestions, setMemberSuggestions] = useState<any | null>(null);
  const memberList = useAppSelector(selectMembersByGuildId());

  return (
    <>
      <div className="chatInputContainer" style={{ minHeight: "50px" }}>
        {emojiSuggestions ? (
          <EmojiList
            textAreaHeight={45}
            emojiSuggestions={emojiSuggestions}
            title={"emojis"}
            onEmojiSelect={(emoji: string) => {
              setEmojiSuggestions(null);

              const inputTextArea = inputRef.current;
              if (!inputTextArea) return;

              let currentText: string = inputTextArea.value;
              let wordsUptoEmoji: string[] = currentText.substring(0, inputTextArea.selectionEnd).split(" ");
              let remainingText: string = currentText.substring(inputTextArea.selectionEnd, currentText.length);

              let wordToReplaceIndex = wordsUptoEmoji.findLastIndex(
                (word) => word.startsWith(":") && !word.endsWith(":")
              );

              if (wordToReplaceIndex != -1) {
                wordsUptoEmoji[wordToReplaceIndex] = emoji;
                setMessageContent(wordsUptoEmoji.join(" ").concat(remainingText));
              }
            }}
          />
        ) : null}
        {memberSuggestions ? (
          <EmojiList
            textAreaHeight={45}
            emojiSuggestions={memberSuggestions}
            title={"users"}
            onEmojiSelect={(user_id: string) => {
              setMemberSuggestions(null);

              const inputTextArea = inputRef.current;
              if (!inputTextArea) return;

              let currentText: string = inputTextArea.value;
              let wordsUptoEmoji: string[] = currentText.substring(0, inputTextArea.selectionEnd).split(" ");
              let remainingText: string = currentText.substring(inputTextArea.selectionEnd, currentText.length);

              let wordToReplaceIndex = wordsUptoEmoji.findLastIndex(
                (word) => word.startsWith("@") && !word.endsWith(" ")
              );

              if (wordToReplaceIndex != -1) {
                wordsUptoEmoji[wordToReplaceIndex] = `<@${user_id}> `;
                setMessageContent(wordsUptoEmoji.join(" ").concat(remainingText));
              }
            }}
          />
        ) : null}
        <textarea
          ref={inputRef}
          className="messageInput"
          style={{ borderRadius: "8px" }}
          onPasteCapture={(e: any) => {
            e.clipboardData.files.length > 0 && isValidFileUploaded(e.clipboardData.files[0])
              ? setImageToUpload(e.clipboardData.files[0])
              : null;
            inputRef?.current?.focus();
          }}
          placeholder={placeholder}
          autoFocus={true}
          value={messageContent}
          onChange={(e: any) => {
            const currentText: string = e.target.value;
            const wordsUptoEmoji: string[] = currentText.substring(0, e.target?.selectionEnd).split(" ");
            const lastWordUptoCursor: string = wordsUptoEmoji[wordsUptoEmoji.length - 1];
            const emojiName = lastWordUptoCursor.substring(1).toLowerCase();

            if (
              lastWordUptoCursor.charAt(0) == ":" &&
              emojiName.length >= 2 &&
              /^[a-zA-Z_]+$/.test(emojiName) &&
              lastWordUptoCursor.charAt(lastWordUptoCursor.length - 1) != ":" &&
              !memberSuggestions
            ) {
              setEmojiSuggestions(searchEmojis(emojiName));
            } else setEmojiSuggestions(null);

            if (
              lastWordUptoCursor.charAt(0) == "@" &&
              emojiName.length >= 0 &&
              lastWordUptoCursor.charAt(lastWordUptoCursor.length - 1) != " " &&
              !emojiSuggestions
            ) {
              const members: any[] = [];
              memberList?.forEach((member) => {
                if (
                  (member?.username && member?.username.toLowerCase().includes(emojiName.toLowerCase())) ||
                  (emojiName.length == 0 && memberList.length != 10)
                ) {
                  members.push({
                    name: member.username,
                    emoji: (
                      <>
                        <div style={{ position: "relative", width: "30px", height: "30px" }}>
                          <Image
                            style={{ borderRadius: "50%" }}
                            alt="pfp user"
                            fill={true}
                            src={
                              member.avatar_url
                                ? member.avatar_url
                                : "https://res.cloudinary.com/jojochat/image/upload/v1692721134/official/sch2lvjt9iuyuwygzgjg.png"
                            }
                          />
                        </div>
                      </>
                    ),
                    user_id: member.user_id,
                  });
                }
              });
              setMemberSuggestions(members);
            } else setMemberSuggestions(null);
            setMessageContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (emojiSuggestions || memberSuggestions) {
              if (["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
                e.preventDefault();
                return;
              }
            }

            if (e.key == "Enter" && !e.shiftKey) {
              e.preventDefault();
              onMessageSend();
            }
          }}
        ></textarea>
      </div>
      <style jsx>{`
        .chatInputContainer {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          margin-left: 8px;
          margin-right: 8px;
          position: relative;
        }

        .replyBar {
          width: 100%;
          min-height: 25px;
          height: 25px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          background-color: var(--background-secondary);
          border-radius: var(--border-radius) var(--border-radius) 0 0;
          padding-left: 15px;
          overflow: hidden;
        }

        .cancelReplyBtn {
          border-radius: 50%;
          border: none;
          margin-right: 10px;
          cursor: pointer;
          height: 80%;
          aspect-ratio: 1;

          display: flex;
          align-items: center;
          justify-content: center;

          background-color: #e15252;
          color: black;
        }

        .messageInput {
          width: 100%;
          min-height: 45px;
          height: 45px;
          padding-left: 20px;
          font-size: 15px;
          border: transparent;
          background-color: var(--background-secondary);
          display: flex;
          padding-top: 13px;
          padding-bottom: 13px;
          flex-wrap: wrap;
          resize: none;
          padding-right: 10px;
          font-family: Arial, Helvetica, sans-serif;
        }

        .messageInput:focus {
          outline: none;
        }
      `}</style>
    </>
  );
}
