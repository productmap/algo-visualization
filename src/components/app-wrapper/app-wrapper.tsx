import { Outlet } from "react-router-dom";
import style from "./app-wrapper.module.scss";

export default function AppWrapper() {
  return (
    <div className={style.app}>
      <Outlet />
    </div>
  );
}
