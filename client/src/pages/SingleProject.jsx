import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import Status from "../components/status/Status.jsx";
import style from './SingleProject.module.css'
import ChangeStatus from "../components/change_status/ChangeStatus.jsx";
import MainContext from '../context/Main.jsx'


export default function SingleProject() {
  const [showChangeStatus, setShowChangeStatus] = useState(false)
  const [data, setData] = useState();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const { id } = useParams()
  const { user, setMessage } = useContext(MainContext)


  useEffect(() => {
    if (showChangeStatus) return;

    axios.get('http://localhost:3000/projektas/' + id)
      .then(resp => setData(resp.data))
      .catch(err => console.log(err.message))
  }, [showChangeStatus])

  function handleDelete() {
    if (data.status === "Priimtas" || data.status === "Atmestas") setMessage('Projekto kurio statusas yra ' + data.status + ' ištrinti negalima')
    else if (window.confirm(`Ar tikrai norite ištrinti Prjektą`)) {
      // const authorValidate = axios.interceptors.request.use((req) => {
      //   const controller = new AbortController();
      //   if (user._id != data.author._id) {
      //     navigate('/projektas/' + id);
      //     setMessage('trinti projektą gali tik jį sukūrę vartotojai');
      //     controller.abort();
      //     axios.interceptors.request.eject(authorValidate);
      //   }
      //   return { signal: controller.signal }
      //   return req;
      // },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
      axios.delete('http://localhost:3000/' + id)
        .then(resp => {
          // axios.interceptors.request.eject(authorValidate);
          navigate('/pagrindinis')
        })
      .catch(err => {
        console.log(err)
      })
    }
  }

  return data && (
    <div className={'container ' + style.project_wraper}>
      <div className={style.project_controls_wraper}>
        {user._id === data.author._id &&
          <><button
            className="btn btn-primary"
            onClick={() => navigate('/projektas/tvarkyti-projekta/' + id)}
          >
            Tvarkyti Projektą
          </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete()
              }}
            >
              Trinti projektą
            </button></>
        }
      </div>

      <table className='table table-striped'>

        <tbody>
          <tr>
            <td><strong>Projekto pavadinimas:</strong></td>
            <td>{data.project_name}</td>
          </tr>
          <tr>
            <td><strong>Projekto statusas:</strong></td>
            <td>
              <Status data={data.status} />
              {user.addmin &&
                <span
                  className={
                    "bg-dark text-light " + style.change_status
                  }
                  onClick={() => setShowChangeStatus(true)}>Keisti Statusa
                </span>
              }
            </td>
          </tr>
          <tr>
            <td><strong>Projekto nuotrauka:</strong></td>
            <td><img className={style.photo} src={'http://localhost:3000/uploads/' + data.picture} /></td>
          </tr>
          <tr>
            <td><strong>Projekto sukūrimo data:</strong></td>
            <td>{new Date(data.created_at).toLocaleDateString()}</td>
          </tr>
          <tr>
            <td><strong>Projekto svarstymo data:</strong></td>
            <td>{new Date(data.hearing_at).toLocaleDateString()} </td>
          </tr>
          <tr>
            <td><strong>Projekto aprašymas:</strong></td>
            <td>{data.description}</td>
          </tr>
          <tr>
            <td><strong>Projekto autorius:</strong></td>
            <td>
              {data.author.name} {data.author.surname}
            </td>
          </tr>
          <tr>
            <td><strong>Partija:</strong></td>
            <td className="d-flex gap-1" >
              <div>{data.author.party_name}</div>
            </td>
          </tr>
        </tbody>
      </table>
      {showChangeStatus &&
        <ChangeStatus
          setShowChangeStatus={setShowChangeStatus}
          id={id}
        />
      }
    </div>
  )
}
