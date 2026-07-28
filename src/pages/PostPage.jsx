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
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFileView(post.FeaturedImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <button type="button" className="btn btn-warning mr-3">
                  Edit
                </button>
              </Link>
              <button onClick={deletePost} className="btn btn-danger">
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.Content)}</div>
      </Container>
    </div>
  ) : null;
}

export default PostPage;
