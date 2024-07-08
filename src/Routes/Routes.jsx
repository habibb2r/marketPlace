import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import AllProducts from "../Pages/AllProducts/AllProducts";
import FullAbout from "../Pages/FullAbout/FullAbout";
import Login from "../Pages/Accounts/Login/Login";
import Signup from "../Pages/Accounts/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import UserDashBoard from "../Pages/Dashboard/UserDashBoard/UserDashBoard";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import ShopDetails from "../Pages/ShopDetails/ShopDetails";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: '/',
            element: <Home></Home>

        },
        {
          path: "allProducts",
          element: <AllProducts></AllProducts>
        },
        {
          path: "about",
          element:<FullAbout></FullAbout>
        },
        {
          path: "login",
          element: <Login></Login>
        },
        {
          path: "signup",
          element: <Signup></Signup>
        },
        {
          path: 'details/:id',
          element: <ProductDetails></ProductDetails>
        },
        {
          path: 'shopDetails/:id',
          element: <ShopDetails></ShopDetails>
        }

      ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><UserDashBoard></UserDashBoard></PrivateRoute>
        
    }
    
  ]);

