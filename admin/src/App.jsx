import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './pages/navbar'
import Dashboard from './pages/dashboard'
import Bookings from './pages/bookings'
import Payments from './pages/payments'
import Protectedroute from './protectedroute'
import Login from './pages/login'
import ContextProvider from './context/context'
const App = () => {
  return (
    <ContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path="/" element={<Protectedroute><Navbar/></Protectedroute>}>
      <Route index element={<Dashboard/>}/>
      <Route path="/bookings" element={<Bookings/>}/>
      <Route path="/payments" element={<Payments/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </ContextProvider>
  )
}

export default App
