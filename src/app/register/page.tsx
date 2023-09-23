import RegisterForm from "./RegisterForm";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <RegisterForm />
      </div>
    </div>
  );
}
