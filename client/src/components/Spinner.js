import React from 'react'

const Spinner = () => {
  return (
    <div className='bg-black h-screen inset-0 z-[9999] flex justify-center items-center  fixed opacity-70 '>
      <div className=' w-8 h-8 animate-spin border-2 border-solid border-white border-t-transparent rounded-full '>
        
      </div>
    </div>
  )
}

export default Spinner
