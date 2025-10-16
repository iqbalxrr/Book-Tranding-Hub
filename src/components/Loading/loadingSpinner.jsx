import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function LoadingSpinner() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <ScaleLoader color='#FF7B6B' />
    </div>
  )
}
