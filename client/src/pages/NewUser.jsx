import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import MainContext from '../context/Main.jsx'

export default function NewUser() {

  const navigate = useNavigate();
  const [messageLocal, setMessageLocal] = useState();
  const {user,setMessage} = useContext(MainContext)


  useEffect(() => {
    if (!user.addmin) {
      console.log("should redirect")
      setMessage('vartotojų nustatymai prieinami tik administratoriui')
      navigate('/pagrindinis')
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post('http://localhost:3000/vartotojai', formData)
      .then(resp => navigate('/vartotojai'))
      .catch(err => setMessageLocal(err.response.data))

  };

  return (
    <div>
      <div className="container">
        <div>
          <form
            className="mt-5 "
            onSubmit={handleSubmit}
            id="new_user"
          >
            {
              messageLocal &&
              <div className="alert alert-danger">{messageLocal}</div>
            }
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="name"
              >
                Vardas
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="surname"
              >Pavardė
              </label>
              <input
                className="form-control"
                type='text'
                name="surname"
                id="surname"
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="party_name"
              >Partija
              </label>
              <input
                className="form-control"
                type='text'
                name="party_name"
                id="party_name"
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="email"
              >el. paštas
              </label>
              <input
                className="form-control"
                type='email'
                name="email"
                id="email"
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="password"
              >Slaptažodis
              </label>
              <input
                className="form-control"
                type='password'
                name="password"
                id="password"
              />
              <div className='form-text'>Slaptažodis turi turėti bent po vieną didžiaja ir mažają raides, skaičiu ir simbolį (#?!@$ %^&*-.+=) taip pat negali būti trumpesnis nei 8 simboliai.</div>
            </div>
          </form>
          <button
            className="btn btn-primary"
            type="submit"
            form="new_user"
          >
            Teikti
          </button>
        </div>
      </div>
    </div>
  )
}
