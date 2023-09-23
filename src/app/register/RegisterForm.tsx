"use client";
import { register } from "@/lib/api";
import styles from "./page.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";
import { fetchIdentity, selectAuth } from "@/lib/authSlice";

function verifyEmail(email: string) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
  return regex.test(email);
}

export default function RegisterForm() {
  const dispatch = useAppDispatch();

  const { status: authStatus } = useAppSelector(selectAuth());

  useEffect(() => {
    if (authStatus == "success") {
      router.push("/forum");
    }
  }, [authStatus]);
  const router = useRouter();

  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [cPassword, setCPassword] = useState("");
  let [errorMsg, setErrorMsg] = useState({
    text: "Something went wrong! Try again.",
    enabled: false,
  });
  let [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: any) => {
    let target = event.target;

    if (target.name == "username") {
      setUsername(target.value);
    } else if (target.name == "email") {
      setEmail(target.value);
    } else if (target.name == "password") {
      setPassword(target.value);
    } else if (target.name == "cpassword") {
      setCPassword(target.value);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (username.trim().length == 0) {
      setErrorMsg({ text: "Username field is blank", enabled: true });
      return;
    }
    if (email.trim().length == 0) {
      setErrorMsg({ text: "Email field is blank", enabled: true });
      return;
    }
    if (password.trim().length == 0) {
      setErrorMsg({ text: "Password field is blank", enabled: true });
      return;
    }
    if (password !== cPassword) {
      // passwords don't match
      setErrorMsg({ text: "Passwords don't match", enabled: true });
      return;
    }
    if (!verifyEmail(email)) {
      setErrorMsg({ text: "Please enter a valid email", enabled: true });
      return;
    }
    try {
      setLoading(true);
      setErrorMsg({ text: "Something went wrong! Try again.", enabled: false });
      let { auth_token } = await register(username, email, password);
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
      setErrorMsg({ text: "Something went wrong! Try again.", enabled: true });
    }
  };

  return ["loading", "success"].includes(authStatus) ? (
    <Loading />
  ) : (
    <>
      <span className={styles.title}>Create An Account</span>
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
          <label htmlFor="username">Username</label>
          <AccountCircleIcon
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
            id="username"
            name="username"
            placeholder=""
            value={username}
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
        <div className={styles.inputContainer}>
          <label htmlFor="cpassword">Confirm Password</label>
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
            id="cpassword"
            name="cpassword"
            placeholder=""
            value={cPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" value="Submit" className={styles.submit}>
          {loading ? <Loading /> : "Register"}
        </button>
      </form>
      <h5 className={styles.registerPrompt} style={{ paddingBottom: "5px" }}>
        Already have an account? <Link href="/login">Login</Link>
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
