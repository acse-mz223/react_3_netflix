import React from 'react'

function Footer() {
  return (
    <>
        <div className='w-full h-4 bg-black'></div>
        <footer className='bg-black w-full text-gray-300 p-8'>
            Created by <a href="https://github.com/acse-mz223" className='underline hover:text-blue-700'>mo</a>. The source code is available on GitHub
        </footer>
    </>
  )
}

export default Footer