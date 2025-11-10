import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='flex w-full justify-center items-center mt-8'>
      <div className='flex justify-around w-3/4'>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold text-blue-500 cursor-pointer'>Task Providers</h1>
        <p className='mt-4 w-[500px] text-pretty leading-8'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s
          when an unknown printer took a gallery of type and scrambled it to make a type specimen book
        </p>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-semibold'>Company</h1>
        <div className='mt-4 leading-8'>
          <p>Home</p>
          <p>About us</p>
          <p>Delivery</p>
          <p>Privacy policy</p>
        </div>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-semibold'>Get in touch</h1>
        <div className='mt-4 leading-8'>
          <p>+254714471627</p>
          <p>Wrightgichana@gmail.com</p>
        </div>
      </div>
      </div>
    </div>
    <hr className='mt-4'/>
    <p className='text-center mt-4'>Copyright 2024 @Taskproviders.com-All Right Reserved.</p>
    <br/>
    </>
  )
}

export default Footer