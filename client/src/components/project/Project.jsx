import { useNavigate } from "react-router-dom";

import style from "./Project.module.css";
import Status from "../status/Status";
import DateFormat from "../date_format/DateFormat";

export default function Project({ data }) {
  const navigate = useNavigate();

  return (
    data && (
      <div
        className={style.project}
        onClick={() => navigate("/projektas/" + data._id)}
      >
        <div className={style.photo}>
          <img src={"http://localhost:3000/uploads/" + data.picture} />
        </div>
        <div className={style.title}>{data.project_name}</div>
        <div className={style.project_details}>
          <div>
            <div className="font-bold text-gray-900 ">
              <strong>Autorius: </strong>
              <p>
                {data.author?.name} {data.author?.surname}
              </p>
            </div>
            <div className="font-bold text-gray-900 ">
              <strong>Partija: </strong>
              <p>{data.author?.party_name}</p>
            </div>
          </div>
          <div className="font-bold text-gray-900 ">
            <div>
              <strong>Sukurta:</strong>
              <DateFormat data={data.created_at} />
            </div>
            <div className="font-bold text-gray-900 ">
              <strong>Svarstymo data:</strong>
              <DateFormat data={data.hearing_at} />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-1 ">
          <strong>Statusas:</strong>
          <Status data={data.status} />
        </div>
      </div>
    )
  );
}
