import axios from "axios";
import MainContext from "../context/Main.jsx";
import { useContext, useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

export default function LoggIn() {
  const { user, setUser } = useContext(MainContext);
  const navigate = useNavigate();

  if (user) {
    navigate("/pagrindinis");
  }

  const [message, setMessage] = useState();

  useEffect(() => {
    setTimeout(() => {
      setMessage();
    }, 10000);
  }, [message]);

  function handleLoggIn(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    axios
      .post("http://localhost:3000/prisijungti", formData)
      .then((resp) => {
        setUser(resp.data);
        navigate("/pagrindinis");
      })
      .catch((err) => setMessage(err.response.data));
  }

  return (
    <div>
      <div className="container h-screen">
        <div className="flex justify-center h-full items-center">
          <div className="p-10 rounded-xl shadow-custom bg-base-100">
            <form
              className="flex flex-col items-center"
              onSubmit={handleLoggIn}
              id="logg_in"
            >
              <h1 className="flex flex-col text-center items-center p-5 mb-12 text-5xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Prisijungti Prie
                <span class="text-blue-600 dark:text-blue-500 leading-none">
                  Portalo
                </span>
              </h1>
              <label htmlFor="email" className="mb-4 w-full flex flex-col">
                <span className="mb-2">El-pašto adresas.</span>
                <input
                  // className="form-control"
                  className="input input-bordered w-full bg-base-200"
                  type="email"
                  name="email"
                  id="email"
                />
              </label>

              <label htmlFor="password" className="mb-4 w-full flex flex-col">
                <span className="mb-2">Slaptažodis</span>
                <input
                  // className="form-control"
                  className="input input-bordered w-full bg-base-200"
                  type="password"
                  name="password"
                  id="password"
                />
              </label>
              <button
                class="w-100 btn btn-primary"
                type="submit"
                form="logg_in"
              >
                Prisijungti
              </button>
              {message && (
                <div
                  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute bottom-3 flex items-center "
                  role="alert"
                >
                  <p>
                    <span className="font-bold mr-1 h-6 leading-none">
                      Klaida!
                    </span>
                    {message}
                  </p>
                  <svg
                    class="fill-current h-4 w-4 text-red-500 ml-2"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="4 4 12 12"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
