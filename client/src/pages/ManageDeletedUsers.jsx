import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import DeletedUser from "../components/deleted_user/DeletedUser";
import style from './UserManagmet.module.css'
import MainContext from '../context/Main.jsx'


export default function ManageDeletedUsers() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [userLoader, setUserLoader] = useState(false)
  const { user, setMessage } = useContext(MainContext)

  useEffect(() => {
    const adminValidate = axios.interceptors.request.use((req) => {
      if (!user.addmin) {
        navigate('/pagrindinis');
        axios.interceptors.request.eject(adminValidate);
      };
      return req;
    },
      (err) => {
        console.log(err);
      }
    );
    axios.get('http://localhost:3000/vartotojai')
      .then(resp => {
        const filteredData = resp.data.filter((user) => !user.active_user);
        setData(filteredData);
        axios.interceptors.request.eject(adminValidate);
      })
      .catch(err => {
        if (err.response.status === 401) setMessage('vartotojų nustatymai prieinami tik administratoriui');
        console.log(err.message);
      })


    console.log('loading');
  }, [userLoader])
  console.dir(data)

  return (
    <div>
      <div className="container">
        <div className={style.add_user_block}>
          <button
            className=" btn btn-primary"
            onClick={() => navigate('/vartotojai')}
          >
            Aktyvūs vartotojai
          </button>
        </div>
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
              {data.map(user =>
                <DeletedUser
                  key={user._id}
                  data={user}
                  userLoader={userLoader}
                  setUserLoader={setUserLoader}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
