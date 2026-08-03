import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/appconfig";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Container } from "../comps";

function PostPage() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug)
      .then((post) => {
        if (post) {
            // console.log(post) ; 
            setPost(post);
        }
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const userData = useSelector((state) => state.auth.userData);

  let isAuthor = false ; 

if(post && userData){

    //   console.log(userData.userData.$id) ; 

    // console.log(post)
    // console.log(userData)
    // console.log(post.userID)
    // console.log(typeof post.userID)
    // console.log(userData.userData.$id)
    // console.log(typeof userData.userData.$id)
    // console.log(userData.userData.$id === post.userID)
    
    isAuthor = ( post.userID === userData.userData.$id )

}

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.FeaturedImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10">
      <Container>

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl  text-slate-900 " style={{ fontFamily: "Satisfy, cursive" }}>
            {post.Title}
          </h1>
        </div>

        {/* Featured Image */}
        <div className="flex justify-center mb-10 relative">
          <div className="relative inline-block">
            <img
              src={service.getFileView(post.FeaturedImage)}
              alt={post.Title}
              className="max-w-[70vw] max-h-[60vh] w-auto h-auto rounded-2xl shadow-lg"
            />
            {isAuthor && (
              <div className="absolute top-5 right-5 flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <button className="btn btn-warning">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={deletePost}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto browser-css text-[25px] leading-8">
          {parse(post.Content)}
        </div>

      </Container>
    </div>
  ) : null;
}

export default PostPage;
