"use client";

import { useRef, useState } from "react";

import Loading from "../../../../components/Loading/Loading";
import api from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { joinGuild, selectGuilds } from "@/lib/slices/chatSlice";
import { useSocket } from "../../../../components/SocketContext";
import TextInputArea from "./TextInputArea";
import useAutosizeTextArea from "@/hooks/useAutoSizeTextArea";

const isValidFileUploaded = (file: File) => {
  const validExtensions = ["png", "jpeg", "jpg", "quicktime", "webp", "gif"];
  const fileExtension = file.type.split("/")[1];
  return validExtensions.includes(fileExtension);
};

export default function CreatePost(props: any) {
  const socket = useSocket();
  const [guildIcon, setGuildIcon] = useState<any>(null);
  const [guildName, setGuildName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [loading, setLoadiing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const guilds = useAppSelector(selectGuilds());
  const inputRef: any = useRef();

  useAutosizeTextArea(inputRef?.current, text);

  async function createGuild() {
    if (!guildName) return;
    if (!guildIcon) return; //todo
    setLoadiing(true);
    const data = await api.createGuild(guildIcon, guildName);
    if (!data) return;
    socket.emit("join_room", { room: data.guild_id });
    dispatch(joinGuild(data));
    props?.setOpenGuildModal(false);
  }

  return (
    <>
      <div
        className="guildModal"
        onClick={() => props?.setOpenGuildModal(false)}
      >
        <div
          className="guildContainer"
          style={{ position: "relative" }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="modalText">Create Post</span>
          <span className="modalText2">
            To Create a post enter a title and text
          </span>
          <input
            type="text"
            placeholder="Enter a cool title"
            value={guildName}
            onChange={(e) => setGuildName(e.target.value)}
            className="modalInput"
          />
          <TextInputArea
            setImageToUpload={setGuildIcon}
            onMessageSend={() => console.log("hi")}
            messageContent={text}
            setMessageContent={setText}
            placeholder="what"
            inputRef={inputRef}
          />
          <button className="modalSubmit" onClick={() => createGuild()}>
            {loading ? <Loading /> : "Create Server"}
          </button>
        </div>
      </div>
      <style jsx>{`
        .guildModal {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .guildContainer {
          position: relative;
          width: 358px;
          height: 447px;

          display: flex;

          align-items: center;
          background-color: var(--background-primary);
          z-index: 0;
          border-radius: 30px;
          flex-direction: column;
        }

        /* Creates the shadow */
        .guildContainer::before {
          content: "";
          position: absolute;
          z-index: -15;
          inset: -1px;
          transform: translate(0px, 0px);
          background: -webkit-linear-gradient(
            0deg,
            rgba(0, 212, 255, 1) 0%,
            rgba(0, 86, 255, 1) 59%,
            rgb(0, 68, 255) 100%
          );
          filter: blur(5px);
          border-radius: 30px;
        }
        /* Reproduces the main element styles */
        .guildContainer::after {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          /* Inherit all the decorations defined on the main element */
          background: inherit;
          border: inherit;
          box-shadow: inherit;
          border-radius: 30px;
        }

        .modalText {
          font-size: 30px;
          background: -webkit-linear-gradient(
            0deg,
            rgba(0, 212, 255, 1) 0%,
            rgba(0, 86, 255, 1) 59%,
            rgb(0, 68, 255) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
          margin-top: 32px;
          margin-bottom: 10px;
        }

        .modalText2 {
          margin-bottom: 30px;
          font-size: 12px;
          color: #9c9c9c;
          text-align: center;
          word-wrap: normal;
          width: 320px;
        }

        .modalInput {
          width: 90%;
          height: 10%;
          border-radius: 7px;
          border: none;
          background-color: var(--background-secondary);
          color: white;
          margin-bottom: 40px;
          padding-left: 20px;
        }

        .modalInput:focus {
          outline: none;
        }

        .modalSubmit {
          width: 90%;
          height: 11%;
          background-color: var(--foreground-primary);
          color: var(--background-secondary);
          border: none;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatInputArea {
          height: auto;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: center;
        }

        .file {
          width: 93px;
          height: 90px;
          aspect-ratio: 1;
          margin-left: 10px;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--background-secondary);
          border-radius: 50%;
          position: relative;
          cursor: pointer;
          margin-bottom: 40px;
        }
      `}</style>
    </>
  );
}
