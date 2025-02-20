import { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';

import DashboardRoutes from './dashboard/dashboard-routes'
import WebsiteRoutes from './website/website-routes'
import Authentication from './authentication/authentication'

import AppContext from './hooks/app-context'

import { checkSession } from './authentication/scripts/authentication-scripts';

function App() {
  const [ checkAuth, setCheckAuth ] = useState(false)
  const [ oneLoad, setOneLoad ] = useState(false)

  const fncCheckSession = async () => {
    await checkSession("auth")
    .then((res) => {
      setCheckAuth(res)
    })
    .catch((err) => {
      err != null && console.error("Err : ", err);
    });
  }


  useEffect(() => {
    oneLoad == false ? setOneLoad(true) : fncCheckSession();
  }, [oneLoad])

  return (
    <AppContext.Provider value={{ checkAuth, setCheckAuth }}>
      <Routes>
          <Route path="/*" element={<WebsiteRoutes />} />
          <Route path="/dash/*" element={checkAuth ? <DashboardRoutes /> : <Authentication />} />
          <Route path="/auth/*" element={<Authentication />} />

          <Route path="*" element={<>
            <h1>page error 404</h1> 
            <NavLink to="../">retour</NavLink> | 
            <NavLink to="/">home</NavLink> 
          </>} />
          
      </Routes>
    </AppContext.Provider>
  )
}

export default App