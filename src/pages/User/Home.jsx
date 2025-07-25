import React from 'react'

const Home = () => {
  return (
    <div className='h-screen flex justify-around items-center'>
      <div className='h-1/2 flex flex-col items-start justify-center gap-12'>
        <h1 className='font-bold text-5xl'>Looking For A Job?</h1>
        <p>Create your account today and let's get started!</p>
        <button className='px-4 py-1 rounded-2xl bg-amber-300'>Get started</button>
      </div>
      <div className='h-1/2'>
        <img className='h-full w-full sticky bottom-0' src="/side.jpg" alt="Image" />
      </div>
    </div>
  )
}

export default Home
