import React , {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Input , Select , RTE} from './index'
import service from '../appwrite/appconfig'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PostForm({post}) {
    const {register , handleSubmit , control , watch , setValue 
      , getValues} = useForm({
          defaultValues :{
            title :post?.Title || '' ,
            slug : post?.$id || '' , 
            content : post?.Content || '' , 
            status : post?.Status || 'active' , 

          }    
    })

    const navigate = useNavigate() 
    const userData = useSelector((state)=> state.auth.userData)

    const submit = async(data ) =>{
      if(post){  // edit post 
        
        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

        if(file){
          service.deleteFile(post.FeaturedImage)
        }
        const dbPost = await service.updatePost(post.$id , {...data , FeaturedImage : file ? file.$id : undefined})

        if(dbPost){
          navigate(`/post/${post.$id}`)
        }
      }
      else{ // create new post 
        const file =  await service.uploadFile(data.image[0]) ;

        if(file){
          const fileId = file.$id 
          data.featuredImage = fileId
          // console.log(data  , userData.userData.$id)
          const dbPost = await service.createPost({...data , userID : userData.userData.$id ,} )

          if(dbPost){
            navigate(`/post/${dbPost.$id}`)
          }
        }
      }
    }

    const slugTransform = useCallback((value)=>{
      if(value && typeof value==='string'){
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+g/ , '-')
        .replace(/\s+/g , '-')
        .replace(/-+/g, "-");
      }
      return ''
    } , [])

    useEffect(()=>{
      const subscription = watch((value , {name})=>{
        if(name === 'title'){
            setValue('slug' , slugTransform(value.title ), {shouldValidate : true} )
        }
      })

      return() =>{
        subscription.unsubscribe()
      }

    },[watch , slugTransform , setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='px-2 w-2/3'>
        <Input
          label = "Title :"
          placeholder = "Title"
          className = "mb-4"
          {...register("title" , {required: true})}
        />
        <Input
          label = "Slug :"
          placeholder = "Slug"
          className = "mb-4"
          {...register("slug" , {required: true})}
          onInput = {(e)=>{
            setValue("slug" , slugTransform(e.currentTarget.value) , 
            {shouldValidate : true})
          }}
        />
        <RTE label = "Content" name="content" control={control} 
          defaultValue={getValues("content")}
        />
      </div>
      <div className='w-1/3 px-2'>
          <Input
            label = "Featured Image"
            type = "file"
            className ="mb-4"
            accept = "image/png ,image/jpg ,image/jpeg ,image/gif "
            {...register("image" ,{required : !post})}
          />
          {post && (
            <div className='w-full mb-4'>
              <img src={service.getFilePreview(post.FeaturedImage)} 
              alt={post.title} className='rounded-lg'/>
            </div>
          )}
          <Select
            options = {["active" , "inactive"]}
            label = "status"
            className= "mb-4"
            {...register("status" ,{required : true})}
          />
          <button type="submit" className="btn btn-success w-full">
            {post ? "update" : "Submit"}
          </button>
      </div>
    </form> 
  )
}

export default PostForm