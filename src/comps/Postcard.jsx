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
        <Link
          to={`/post/${$id}`}
          className="block !no-underline !text-slate-800"
        >
        <div className="w-full h-[340px] bg-gray-200 rounded-2xl p-4">
          <img
            src={preview}
            alt="Post"
            className="w-full h-56 object-cover rounded-lg"
          />
          <h2 className="mt-3 !text-[23px] !font-normal  truncate">
            {Title}
          </h2>
        </div>
        </Link>
    </div>
    }
}

export default Postcard