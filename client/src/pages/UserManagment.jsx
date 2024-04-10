import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import User from "../components/user/User";
import style from "./UserManagmet.module.css";
import MainContext from "../context/Main.jsx";

export default function UserManagment() {
  const { user, setMessage } = useContext(MainContext);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [userLoader, setUserLoader] = useState(false);
  const [messageLocal, setMessageLocal] = useState();

  useEffect(() => {
    const adminValidate = axios.interceptors.request.use(
      (req) => {
        if (!user.addmin) {
          navigate("/pagrindinis");
          axios.interceptors.request.eject(adminValidate);
        }
        return req;
      },
      (err) => {
        console.log(err);
      }
    );
    axios
      .get("http://localhost:3000/vartotojai")
      .then((resp) => {
        const filteredData = resp.data.filter((user) => user.active_user);
        setData(filteredData);
        axios.interceptors.response.eject(adminValidate);
      })
      .catch((err) => {
        if (err.response.status === 401)
          setMessage("vartotojų nustatymai prieinami tik administratoriui");
        else console.log(err.message);
      });

    // if (!user.addmin)
    //   return (
    //     setMessage("Vartotojų nustatymai prieinami tik admnistratoriui")
    //     // navigate('/pagrindinis')
    //   );

    console.log("loading");
  }, [userLoader]);
  console.dir(data);

  return (
    <div>
      <div className="container">
        <div
          className={
            "d-flex gap-3 flex justify-content-center " +
            style.manage_users_block
          }
        >
          <button
            className="btn glass"
            onClick={() => {
              if (data.length < 4) navigate("/vartotojai/naujas-vartotojas");
              else
                setMessageLocal(
                  "Maksimalus aktyvių vartotojų skaičius pasiektas."
                );
            }}
          >
            Prideti naują vartotją
          </button>
          <button
            className="btn glass"
            onClick={() => navigate("/vartotojai/pasalinti-vartotojai")}
          >
            Pašalinti vartotojai
          </button>
        </div>
        {messageLocal && (
          <div className="alert alert-danger">{messageLocal}</div>
        )}
        <div className={style.user_table_container}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>vardas pavardė</th>
                <th>el. paštas</th>
                <th>partija</th>
                <th>Registravimo data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <User
                  key={user._id}
                  data={user}
                  userLoader={userLoader}
                  setUserLoader={setUserLoader}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
