import {Route, Routes} from "react-router-dom"
import Home from "./users/Home";
import AdminHome from "./admin/Home";
import AdminLogin from "./admin/Login";
import AdminAddProduct from "./admin/AddProduct";
import axios from "axios"
import AdminAddCategories from "./admin/AddCategories";
import Statestic from "./admin/Statestic";
import Login from "./users/Login";
import Signup from "./users/Signup";
import Cart from "./users/Cart";
import ProductDetail from "./users/ProductDetail";
import UserDetails from "./users/userDetails";
// import Profile from "./users/Profile";


axios.defaults.withCredentials = true

function App() {
  return (
    <>
    
      <Routes>

      {/* USER routes */}

        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Signup/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/product/:name/:title" element={<ProductDetail/>}></Route>
        <Route path="/product/:name/shipping" element={<UserDetails/>}></Route>
        {/* <Route path="/profile" element={<Profile/>}></Route> */}


      {/* ADMIN routes */}
      
      <Route path="/admin" element={<AdminHome/>}></Route>
      <Route path="/admin/login" element={<AdminLogin/>}></Route>
      <Route path="/admin/addproduct" element={<AdminAddProduct/>}></Route>
      <Route path="/admin/addcategories" element={<AdminAddCategories/>}></Route>
      <Route path="/admin/dashboard" element={<Statestic/>}></Route>

      </Routes>
    
      
    </>
  );
}

export default App;
