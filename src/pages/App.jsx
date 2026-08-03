import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import { AuthActions } from "../store/authSlice";

import { Header, Footer , LoadingSpinner} from "../comps";
import "./App.css";
import { Outlet } from "react-router-dom";



function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);

  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    
    authService.getCurrentUser().then((userData) => {

      

      if (userData) {
        dispatch(AuthActions.login({ userData }));
      } else {
        dispatch(AuthActions.logout());
      }
      
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-2xl">
      <Header />
      <main className="flex-1 bg-gray-50">
        {Loading ? <LoadingSpinner /> : <Outlet />}
      </main>
      <Footer />
    </div>
  
  );
}

export default App;
