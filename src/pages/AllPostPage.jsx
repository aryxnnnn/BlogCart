import React, { useEffect, useState } from 'react'
import { Container , Postcard } from '../comps'
import service from '../appwrite/appconfig'

function AllPostPage() {

  const [posts , setPosts] = useState([]) 

  useEffect(()=>{
    service.getPosts([])
    .then((posts)=>{
      if(posts){
        // console.log("Documents:",posts.documents)
        setPosts(posts.documents)
      }
    })

  } , [])

  // console.log("Posts state:", posts);

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post, index) => {
            // console.log("Map item:", index, post);
            return (
              <div key={post?.$id || index} className='p-2 w-1/4'>
                <Postcard post={post} />
              </div>
            );
          })} 
        </div>
      </Container>
    </div>
  );
}

export default AllPostPage