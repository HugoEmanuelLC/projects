// Dependencies
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

// Routes
import WebsiteRoutes from './website/website-routes'
import DashboardRoutes from './dashboard/dashboard-routes'


function App() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<WebsiteRoutes/>} />
        <Route path="/dash/*" element={<DashboardRoutes/>} />
      </Routes>
    </>
  )
}

export default App
