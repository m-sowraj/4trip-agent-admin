import React from 'react'
import SearchBar from './SearchBar'
import { CircleArrowDown } from 'lucide-react'
import HomeDashboard from './HomeDashBoard'

function Home() {
  return (
    <div className='w-[80%] h-[80vh] max-h-[75vh] overflow-scroll m-auto flex flex-col gap-8 bg-white p-6 px-10 shadow-lg rounded-2xl'>
        {/* <HomeDashboard/> */}
        <div className='w-full'>
          <h1 className='text-2xl text-center font-bold'>Welcome to the Home Page</h1>
        </div>
    </div>

  )
}

export default Home
