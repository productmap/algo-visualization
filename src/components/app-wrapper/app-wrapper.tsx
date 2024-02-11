import { Outlet } from "react-router-dom";
import styles from "./app-wrapper.module.scss";

export default function AppWrapper() {
  return (
    <div className={styles.app}>
      <Outlet />
    </div>
  );
}
