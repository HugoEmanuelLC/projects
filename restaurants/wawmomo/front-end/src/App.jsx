// Dependencies
import { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';

// Routes
import WebsiteRoutes from './website/website-routes'
import Authentication from './authentication/authentication'


function App() {

  return (
      <Routes>
          <Route path="/*" element={<WebsiteRoutes />} />
          <Route path="/dash/*" element={<Authentication />} />
          <Route path="*" element={<>
            <h1>page error 404</h1> 
            <NavLink to="../">retour</NavLink> | 
            <NavLink to="/">home</NavLink> 
          </>} />
      </Routes>
  )
}

export default App