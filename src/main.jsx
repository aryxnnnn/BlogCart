import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./pages/App.jsx";
import store from "./store/store.js";

import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import  AuthLayout from "./comps/AuthLayout.jsx"
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AllPostPage from "./pages/AllPostPage.jsx";
import { AddPostPage, EditPostPage, PostPage } from "./comps/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage/> } , 
      { path: "/login" , element :(
          <AuthLayout authentication = {false}>
            <LoginPage/>
          </AuthLayout>
         )
      },
      { path: "/signup" , element :(
          <AuthLayout authentication = {false}>
            <SignupPage/>
          </AuthLayout>
         )
      },
      { path: "/all-posts" , element :(
          <AuthLayout authentication = {true}>
            <AllPostPage/>
          </AuthLayout>
         )
      },
      { path: "/add-post" , element :(
          <AuthLayout authentication = {true}>
            <AddPostPage/>
          </AuthLayout>
         )
      },
      { path: "/edit-post/:slug" , element :(
          <AuthLayout authentication = {true}>
            <EditPostPage/>
          </AuthLayout>
         )
      },
      { path: "/post/:slug" , element :(
          <AuthLayout authentication = {true}>
            <PostPage/>
          </AuthLayout>
         )
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
