import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './NewProject.module.css';
import axios from 'axios';
import MainContext from '../context/Main.jsx'

export default function NewProject() {

  const navigate = useNavigate();
  const [messageLocal, setMessageLocal] = useState();

  const { user, setMessage } = useContext(MainContext)

  useEffect(() => {
    if (user.admin) {
      console.log("should redirect")
      setMessage('administratorius negali kurti Projektų')
      navigate('/pagrindinis')
    }
  });

  function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      formData.append('author', user._id)
      axios.post('http://localhost:3000', formData)
        .then(resp => navigate('/pagrindinis'))
        .catch(err => setMessageLocal(err.response.data))

    };

  return (
    <div>
      <div className="container">
        <div>
          <form
            className={"mt-5 " + style.project_form}
            onSubmit={handleSubmit}
            id="new_project"
          >
            {
              messageLocal &&
              <div className="alert alert-danger">{messageLocal}</div>
            }
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="project_name"
              >
                Projekto pavadinimas
              </label>
              <input
                className="form-control"
                type="text"
                name="project_name"
                id="project_name"
              />
              {/* <div className='form-text'>Projekto pavadinimas yra privalomas ir negali buti ilgesnis nei 80 simbolių.</div> */}
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="description"
              >Projekto aprašymas
              </label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                rows="30"
              >
              </textarea>
              {/* <div className='form-text'>Projekto aprašymas yra privalomas ir negali būti ilgesnis nei 2000 simbolių.</div> */}
            </div>
            <div className='mb-3'>
              <label
                className='form-labelw'
                htmlFor="hearing_at"
              >Svarstymo data
              </label>
              <input
                className='form-control'
                type='date'
                name='hearing_at'
                id='hearing_at'
              />
              {/* <div className='form-text'>svarstymo data turi būti nurodyta.</div> */}
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="picture"
              >
                Projekto nuotrauka
              </label>
              <input
                className="form-control"
                type="file"
                name="picture"
                id="picture"
              />
              {/* <div className='form-text'>Įkelti nuotrauką yra privaloma</div> */}
            </div>
          </form>
          <button
            className="btn btn-primary"
            type="submit"
            form="new_project"
          >
            Teikti
          </button>
        </div>
      </div>
    </div>
  )
}
