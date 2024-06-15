import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'

function App() {
  return (
    <div className='bg-zinc-900 w-full min-h-screen font-["Baloo_2"]'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App