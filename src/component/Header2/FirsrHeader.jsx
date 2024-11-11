import React from 'react'


export default function FirsrHeader() {
  return (
    <div>
<div class="flex justify-center items-center pl-96">
  <div class="h-96 w-1 bg-slate-400"></div>
</div >

        
        <div className=' flex space-x-2  pl-36 -mt-80'>
            <div><h2>Home</h2></div>
            <div>&gt;</div>
            <div className='text-blue-500'> <h2>Employee</h2></div>
            <div></div>
            <div className='border-t-2 border-gray-300 w-96 my-3'></div>
            <div className='border border-sky-500  hover:bg-blue-500' ><button>Add Employee➕</button></div>
            <div className='border-t-2 border-gray-300 w-40 my-3'></div>
        </div>
        <div className='pl-36 py-6'>
            <h1 className=''>Employee Directory</h1>
            <div className='flex'>
  <form action="">
    <div className='flex py-6 '>
      {/* First Input Field */}
      <div className='flex flex-col'>
        <label htmlFor="Name" className='mb-1 w-56'>ID</label>
        <input type="search" className='border border-blue-500' />
      </div>

      {/* Second Input Field */}
      <div className='flex flex-col'>
        <label htmlFor="Name" className='mb-1'>Avaibility</label>
        <input type="search" className='border border-blue-500' />
      </div>

      {/* Third Input Field */}
      <div className='flex flex-col'>
        <label htmlFor="Name" className='mb-1'>Position</label>
        <select className='border border-blue-500 w-44' >
            <option value=""></option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
        </select>
      </div>
      <div className='py-6'>

      <button className=' border-3 w-24 hover:bg-blue-600'>Filter</button>
      </div>
   
      
    </div>
    </form>
    <div className='border-t-2 border-gray-300 w-40 my-16'></div>
    </div>
        </div>
      
    </div>
  )
}
