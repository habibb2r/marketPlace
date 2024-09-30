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
import CartUser from "../Pages/Dashboard/UserDashBoard/CartUser/CartUser";
import UserHome from "../Pages/Dashboard/UserDashBoard/UserHome/UserHome";
import GiveRating from "../Pages/Dashboard/UserDashBoard/GiveRating/GiveRating";
import UpdateUser from "../Pages/Dashboard/UpdateUserInfo/UpdateUser";
import Payment from "../Pages/Dashboard/UserDashBoard/Payment/Payment";
import PayHistory from "../Pages/Dashboard/UserDashBoard/PaymentHistory/PayHistory";
import OrderStatus from "../Pages/Dashboard/UserDashBoard/OrderStatus/OrderStatus";
import AdminPanel from "../Pages/Dashboard/Admin/AdminPanel";
import SellerDashboard from "../Pages/Dashboard/Seller/SellerDashboard";
import SellerProfile from "../Pages/Dashboard/Seller/SellerProfile/SellerProfile";
import AddItems from "../Pages/Dashboard/Seller/AddItems/AddItems";
import ManageItems from "../Pages/Dashboard/Seller/ManageItems/ManageItems";
import ManageOrders from "../Pages/Dashboard/Seller/ManageOrders/ManageOrders";
import AdminStat from "../Pages/Dashboard/Admin/AdminStat/AdminStat";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser/ManageUser";
import ManageShop from "../Pages/Dashboard/Admin/ManageShop/ManageShop";
import ManageAllItems from "../Pages/Dashboard/Admin/ManageAllItems/ManageAllItems";
import PaymentShop from "../Pages/Home/BuyStall/PaymentShop";
import UpdateItem from "../Pages/Dashboard/Seller/ManageItems/UpdateItem";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import ReviewMarketPlace from "../Pages/Dashboard/UserDashBoard/GiveRating/ReviewMarketPlace";
import ReviewProduct from "../Pages/Dashboard/UserDashBoard/GiveRating/ReviewProduct";
import MyReviews from "../Pages/Dashboard/UserDashBoard/GiveRating/MyReviews";
import StallReview from "../Pages/Dashboard/UserDashBoard/GiveRating/StallReview";

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
        },
        {
          path: 'buyshop/:id',
          element: <PaymentShop></PaymentShop>
        }

      ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><UserDashBoard></UserDashBoard></PrivateRoute>,
        children:[
          {
            path: 'cart',
            element:<CartUser></CartUser>
          },
          {
            path: 'userhome',
            element: <UserHome></UserHome>
          },
          {
            path: 'giverating',
            element: <GiveRating></GiveRating>
          },
          {
            path: 'giverating/marketplace',
            element: <ReviewMarketPlace></ReviewMarketPlace>
          },
          {
            path: 'giverating/product',
            element: <ReviewProduct></ReviewProduct>
          },
          {
            path: 'giverating/stall',
            element: <StallReview></StallReview>
          },
          {
            path: 'giverating/myReviews',
            element: <MyReviews></MyReviews>
          },
          {
            path: 'userUpdate',
            element: <UpdateUser></UpdateUser>
          },
          {
            path: 'payment',
            element: <Payment></Payment>
          },
          {
            path: 'payhistory',
            element: <PayHistory></PayHistory>
          },
          {
            path: 'orderstatus',
            element: <OrderStatus></OrderStatus>
          }
        ]        
    },
    {
      path: 'adminpanel',
      element: <AdminRoute><AdminPanel></AdminPanel></AdminRoute>,
      children: [
        {
          path: 'adminhome',
          element: <AdminStat></AdminStat>
        },
        {
          path: 'manageusers',
          element: <ManageUser></ManageUser>
        },
        {
          path: 'manageshops',
          element: <ManageShop></ManageShop>
        },
        {
          path: 'manageallitems',
          element: <ManageAllItems></ManageAllItems>
        },
        {
          path: 'userupdate',
          element: <UpdateUser></UpdateUser>
        }
      ]
    },
    {
      path: 'sellerdashboard',
      element: <SellerRoute><SellerDashboard></SellerDashboard></SellerRoute>,
      children: [
        {
          path: 'sellerprofile',
          element: <SellerProfile></SellerProfile>
        },
        {
          path: 'additems',
          element: <AddItems></AddItems>
        },
        {
          path: 'manageitems',
          element: <ManageItems></ManageItems>
        },
        {
          path: 'manageorders',
          element: <ManageOrders></ManageOrders>
        },
        {
          path: 'userupdate',
          element: <UpdateUser></UpdateUser>
        },
        {
          path: 'updateitem/:id',
          element: <UpdateItem></UpdateItem>
        },
        {
          path: 'itemdetails/:id',
          element: <ProductDetails></ProductDetails>
        }
      ]
    }
    
  ]);

