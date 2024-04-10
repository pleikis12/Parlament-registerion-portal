import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function User({ data, userLoader, setUserLoader }) {
  const navigate = useNavigate();
  function handleReset(id) {
    const formData = new FormData();
    formData.append('active_user', 'true')
    axios.put('http://localhost:3000/vartotojai/' + id, formData)
      .then(resp => setUserLoader(!userLoader))
  }

  return (
    <tr>
      <td>{data.name} {data.surname}</td>
      <td>{data.email}</td>
      <td>{data.party_name}</td>
      <td>{new Date(data.created_at).toLocaleDateString()}</td>
      <td>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handleReset(data._id)}
        >
          Atstatyti
        </button>
      </td>
    </tr>
  )
}
