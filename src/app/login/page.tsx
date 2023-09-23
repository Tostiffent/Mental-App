import RegisterForm from "./loginForm";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <RegisterForm />
      </div>
    </div>
  );
}
