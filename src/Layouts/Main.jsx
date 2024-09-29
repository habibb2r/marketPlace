import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import anidata from '../Pages/Home/Banner/banner.json'
import useConnect from "../Hooks/useConnect";

const Main = () => {

    const [, isLoading] = useConnect()
   

    return isLoading ? <div className="flex flex-col h-[100vh] items-center justify-center pt-[45%] md:pt-[15%]"><Lottie className="h-[300px]" animationData={anidata}></Lottie><span className="text-success font-bold font-mono">Connecting to server</span><span className="loading loading-dots loading-lg text-success"></span></div> :  <>  
    <Navbar></Navbar>
    <div className="pt-[25%] md:pt-[8%]">
    <Outlet></Outlet>
    </div>
    <Footer></Footer>
</>
    
};

export default Main;