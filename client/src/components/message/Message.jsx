import { useContext } from "react";
import MainContext from "../../context/Main.jsx";
import style from "./Message.module.css";

export default function Message() {
  const { message } = useContext(MainContext);
  console.log(message);
  return (
    <div className={"col-2 alert alert-danger " + style.message}>{message}</div>
  );
}
