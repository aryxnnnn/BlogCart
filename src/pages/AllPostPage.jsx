import React, { useEffect, useState } from 'react'
import { Container , Postcard } from '../comps'
import service from '../appwrite/appconfig'

function AllPostPage() {

  const [posts , setPosts] = useState([]) 
  useEffect(()=>{
  
  } , [])

  service.getPost([])
  .then((posts)=>{
    if(posts){
      setPosts(posts.documents)
    }
  })

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
            {posts.map((post)=>(
              <div key={post.$id} className='p-2 w-1/4'>
                <Postcard post={post}/>
              </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPostPage