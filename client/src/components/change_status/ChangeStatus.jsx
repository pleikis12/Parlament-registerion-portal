import axios from 'axios';

import style from './ChangeStatus.module.css'



export default function ChangeStatus({ setShowChangeStatus, id }) {

  // console.dir({id: id})

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    axios.put('http://localhost:3000/keisti-statusa/' + id, formData)
      .then(resp => setShowChangeStatus(false))
      .catch(err => {
        // setMessage(err.response.data)
        console.log(err)
      });
  };

  return (
    <div className={style.change_status}>
      <div className={style.modal} >
        <div>
          <form onSubmit={handleSubmit} id='change_status'>
            <select name="status">
              <option value="Pateiktas">Pateiktas</option>
              <option value="Atmestas">Atmestas</option>
              <option value="Priimtas">Priimtas</option>
              <option value="Nepakanka duomenų">Nepakanka duomenų</option>
            </select>
          </form>
          <div className={style.controls}>
            <button
              type='submit'
              form='change_status'
              className='btn btn-primary'
            >Išsaugoti</button>
            <button className='btn btn-secondary' onClick={() => setShowChangeStatus(false)}>Atšaukti</button>
          </div>
        </div>
      </div>
    </div>
  )
}
