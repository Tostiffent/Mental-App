"use client";
import { login } from "@/lib/api";
import styles from "./page.module.css";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Link from "next/link";
import { fetchIdentity, selectAuth } from "@/lib/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";

function verifyEmail(email: string) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
  return regex.test(email);
}

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  //@ts-ignore
  const { status: authStatus } = useAppSelector(selectAuth());

  useEffect(() => {
    if (authStatus == "success") {
      router.push("/forum");
    }
  }, [authStatus]);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorMsg, setErrorMsg] = useState({
    text: "Something went wrong! Try again.",
    enabled: false,
  });
  let [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: any) => {
    let target = event.target;

    if (target.name == "email") {
      setEmail(target.value);
    } else if (target.name == "password") {
      setPassword(target.value);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (email.trim().length == 0) {
      setErrorMsg({ text: "Email field is blank", enabled: true });
      return;
    }
    if (password.trim().length == 0) {
      setErrorMsg({ text: "Password field is blank", enabled: true });
      return;
    }
    if (!verifyEmail(email)) {
      setErrorMsg({ text: "Please enter a valid email", enabled: true });
      return;
    }

    try {
      setLoading(true);
      setErrorMsg({ text: "Something went wrong! Try again.", enabled: false });
      let { auth_token } = await login(email, password);
      if (!auth_token)
        setErrorMsg({
          text: "Something went wrong! Try again.",
          enabled: true,
        });
      window.localStorage.setItem("auth_token", auth_token);
      dispatch(fetchIdentity()); // this triggers a call to /api/identity to fetch info
      router.push("/forum");
    } catch (err) {
      setLoading(false);
      setErrorMsg({ text: "Invalid credentials! Try again", enabled: true });
    }
  };

  return ["loading", "success"].includes(authStatus) ? (
    <Loading />
  ) : (
    <>
      <span className={styles.title}>Login</span>
      <form
        style={{ height: "90%", width: "100%" }}
        onSubmit={(e: any) => handleSubmit(e)}
      >
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <AlternateEmailIcon
            style={{
              position: "absolute",
              marginTop: "40px",
              marginLeft: "10px",
            }}
            fontSize="medium"
          />
          <input
            className={styles.input}
            type="text"
            id="email"
            name="email"
            placeholder=""
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <KeyIcon
            style={{
              position: "absolute",
              marginTop: "40px",
              marginLeft: "10px",
            }}
            fontSize="medium"
          />
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder=""
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" value="Submit" className={styles.submit}>
          {loading ? <Loading /> : "Login"}
        </button>
      </form>
      <h5 className={styles.registerPrompt} style={{ paddingBottom: "5px" }}>
        Don&apos;t have an account? <Link href="/register">Sign up</Link>
      </h5>
      <h4
        className={styles.errorMsg}
        style={{
          display: errorMsg.enabled ? "block" : "none",
          paddingBottom: "5px",
        }}
      >
        {errorMsg.text}
      </h4>
    </>
  );
}
