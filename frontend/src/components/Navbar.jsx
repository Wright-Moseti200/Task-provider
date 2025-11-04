import React from 'react'
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className='h-16 flex justify-center items-center w-full'>
        <div className='flex w-full justify-around items-center'>
          <h1 className='text-2xl font-bold text-blue-500 cursor-pointer'><Link to="/">TaskProviders</Link></h1>
          <div className='flex w-1/3 justify-around items-center'>
            <p className='cursor-pointer'><Link to = "/">Home</Link></p>
            <p className='cursor-pointer'><Link to = "list">All Providers</Link></p>
            <p className='cursor-pointer'><Link to = "about">About</Link></p>
            <p className='cursor-pointer'><Link to = "contact">Contact</Link></p>
          </div>
          <button className='bg-blue-500 p-3 pl-5 pr-5 rounded-full text-white'><Link to = "login">Create account</Link></button>
        </div>
    </div>
  )
}

export default Navbar