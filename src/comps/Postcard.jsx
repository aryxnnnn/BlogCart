import React from 'react'
import service from '../appwrite/appconfig'

function Postcard({$id , featuredImage , title}) {
  return <div>
      <Link to = {`/post/${$id}`}>
        <div className='w-full bg-gray-600 rounded-2xl p-4'>
          <div className='w-full justify-center mb-4'>
            <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-lg'/>
            <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
          </div>
        </div>
      </Link>
    </div>
}

export default Postcard