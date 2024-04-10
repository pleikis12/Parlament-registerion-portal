import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import style from "./Header.module.css";
import MainContext from "../../context/Main.jsx";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  // const [showMenu, setShowMenu] = useState(false);
  const { user } = useContext(MainContext);

  <button onClick={() => handleLoggout()}>
    Logout
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="white"
        d="M5 11h8v2H5v3l-5-4l5-4zm-1 7h2.708a8 8 0 1 0 0-12H4a9.985 9.985 0 0 1 8-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4"
      />
    </svg>
  </button>;
  function handleLoggout() {
    axios
      .get("http://localhost:3000/atsijungti")
      .then((resp) => {
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <header className="">
      <div className={"d-flex gap-3 " + style.user}>
        <div>
          <i className="bi bi-person-circle"></i> {user.name} {user.surname}
        </div>
        <div
          //
          className={style.loggout}
          onClick={() => handleLoggout()}
        >
          <i className="bi bi-box-arrow-right"></i>
          {/* {
            showMenu &&
            <div className={style.settings_menu}
              onMouseLeave={() => setShowMenu(false)}>
              <div
                className={style.menu_option}
              >
                Vartotojo nustatymai
              </div>
              <div
                className={style.menu_option}
              >
                Tvarkyti vartotojus
              </div>
            </div>
          } */}
        </div>
        <div className="flex justify-content-center">
          <button onClick={() => handleLoggout()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M5 11h8v2H5v3l-5-4l5-4zm-1 7h2.708a8 8 0 1 0 0-12H4a9.985 9.985 0 0 1 8-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4"
              />
            </svg>
          </button>
        </div>

        <nav className="flex justify-content-center d-flex gap-3">
          <button
            className="btn btn-primary btn-sm-small"
            onClick={() => navigate("/pagrindinis")}
          >
            <i className="bi bi-house-fill"></i> Pagrindinis
          </button>
          {!user.addmin && (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/naujas-projektas")}
            >
              Teikti Nauja Projekta
            </button>
          )}
          {user.addmin && (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/vartotojai")}
            >
              Tvarkyti vartotojus
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
