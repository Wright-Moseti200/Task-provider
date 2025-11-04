import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import List from './pages/List'
import Login from './pages/Login'
import "./App.css"
import Preview from './pages/Preview'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/list' element={<List/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/preview' element={<Preview/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App