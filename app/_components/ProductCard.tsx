import React from 'react'

type Props = {}

export default function ProductCard({}: Props) {
  return (
    <div className='flex items-center justify-center my-10 font-[PoppinsMedium]'>
    <div className="flex flex-col self-center w-full max-w-xs overflow-hidden border shadow-md rounded-2xl dark:bg-gray-700 dark:bg-opacity-10 group border-gray-100/30 ">
      <a className="relative flex mx-3 mt-3 overflow-hidden h-52 rounded-xl" href="#">
        <img className="absolute top-0 right-0 object-cover w-full h-full peer" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b" alt="product image" />
        <img className="absolute top-0 object-cover w-full h-full transition-all duration-1000 delay-100 peer peer-hover:right-0 -right-96 hover:right-0" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
        <svg className="absolute inset-x-0 mx-auto text-3xl text-white transition-opacity pointer-events-none group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 bottom-5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
        {/* <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span> */}
      </a>
      <div className="px-5 pb-5 mt-4">
        <a href="#">
          <h5 className="text-xl tracking-tight text-white">Nike Air MX Super 2500 - Red</h5>
        </a>
        
 </div>
  </div></div>
  )
}
