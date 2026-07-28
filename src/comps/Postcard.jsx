import React from 'react'
import service from '../appwrite/appconfig'
import { Link } from 'react-router-dom'


function Postcard({ post }) {
    // console.log(post);
  // console.log("Received post:", post);

  if (!post) {
    return <div>Post is undefined</div>;
  }
  else{

    const { $id, FeaturedImage, Title } = post;
    
    

    const preview = service.getFileView(FeaturedImage);
    

    return <div>
        <Link to = {`/post/${$id}`}>
          <div className='w-full bg-gray-600 rounded-2xl p-4'>
            <div className='w-full justify-center mb-4'>
              <img src={preview} alt="Postimg" className='rounded-lg'/>
              <h2 className='text-xl font-bold text-gray-800'>{Title}</h2>
            </div>
          </div>
        </Link>

    </div>
    }
}

export default Postcard