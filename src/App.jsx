import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/auth/login";
import { toast, ToastContainer } from "react-toastify";
import AdminProducts from "./pages/admin/products";
import { useEffect } from "react";
import Admin from "./pages/admin/main";
import AdminCategory from "./pages/admin/categorys";
import AdminUsers from "./pages/admin/users";
import Register from "./pages/auth/register";
import BuyerPanel from "./pages/buyer/home";
import NotFound from "./pages/NotFound";

function App() {
  const navigate = useNavigate()
  const checkIsLogged = () => {
    let token = localStorage.getItem('token')
    if(!token){
      navigate("/login")
    }
  }

  useEffect(() =>{
    checkIsLogged()
  },[])
  return (
    <>
      <Routes>
        <Route path="/" element={<BuyerPanel />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products-control" element={<AdminProducts />} />
        <Route path="/admin/categories-control" element={<AdminCategory/>}/>
        <Route path="/admin/users-control" element={<AdminUsers/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
