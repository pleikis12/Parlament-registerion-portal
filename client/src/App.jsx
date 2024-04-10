import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'
import Header from './components/header/Header'
import Home from './pages/Home.jsx'
import SingleProject from './pages/SingleProject.jsx'
import NewProject from './pages/NewProject.jsx'
import UserManagment from './pages/UserManagment.jsx'
import NewUser from './pages/NewUser.jsx'
import EditUser from './pages/EditUser.jsx'
import ManageDeletedUsers from './pages/ManageDeletedUsers.jsx'
import EditProject from './pages/EditProject.jsx'
import LoggIn from './pages/LoggIn.jsx'
import MainContext from './context/Main.jsx'
import Message from './components/message/Message.jsx'


function App() {

  const [user, setUser] = useState();
  const [message, setMessage] = useState(false);

  const contextValues = {
    message,
    setMessage,
    user,
    setUser,
  }

  useEffect(() => {
    axios.get('http://localhost:3000/check-auth')
      .then(resp => setUser(resp.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (message) setTimeout(() => setMessage(false), 3000)
  }, [message])

  return (
    <>
      <MainContext.Provider value={contextValues}>
        <BrowserRouter>
          {user &&
            <Header />}
          {message &&
            <Message />
          }
          <Routes>
            {user &&
              <>
                <Route path='/pagrindinis' element={<Home />} />
                <Route path='/projektas/:id' element={<SingleProject />} />
                <Route path='/naujas-projektas' element={<NewProject />} />
                <Route path='/projektas/tvarkyti-projekta/:id' element={<EditProject />} />
                <Route path='/vartotojai' element={<UserManagment />} />
                <Route path='/vartotojai/naujas-vartotojas' element={<NewUser />} />
                <Route path='/vartotojai/:id' element={<EditUser />} />
                <Route path='/vartotojai/pasalinti-vartotojai' element={<ManageDeletedUsers />} />
              </>
            }

            <Route
              path="/"
              element={<LoggIn />}
            />
            <Route
              path="*"
              element={<Navigate to='/' />}
            />
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    </>
  )
}

export default App
