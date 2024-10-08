import { Link, useLocation, useParams } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import { useForm } from "react-hook-form";
import { useState } from "react";
import shopcat from '../../../assets/basic/001-categorization.png'
import shopduration from '../../../assets/basic/002-hourglass.png'
import shopmaxcat from '../../../assets/basic/003-classification.png'
import shopmaxprod from '../../../assets/basic/004-products.png'
import shopprice from '../../../assets/basic/005-price-tag.png'
import CopyText from "../../Shared/CopyText/CopyText";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);
const PaymentShop = () => {
   const id = useParams();
   const [shopInfo, setShopInfo] = useState()
   const { register, handleSubmit, formState: { errors } } = useForm();
   const axiosSecure = useAxiosSecure();
   
   const {data: shopData, isLoading}= useQuery({
    queryKey: ['shopData'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/shopData/${id.id}`)
        return res.data
    }
   })
   
   if(isLoading){
    return <Loading></Loading>
   }
   console.log(shopInfo)
   
  const onSubmit = data => setShopInfo(data);
    return (
        <div>
            <SectionTitle title='Buy Shop'></SectionTitle>
            <div className="flex flex-col justify-center items-center gap-5 md:px-5 md:py-5">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 bg-accent bg-opacity-20 px-3 py-4 shadow-inner shadow-success rounded-md">
                <p className="text-error font-mono font-bold">Before buying please keep updated your Info</p>
                <Link className="btn btn-primary" to='/dashboard/userhome'>Update</Link>
            </div>
            <div className="grid grid-cols-2 font-sans text-xl gap-5 p-5 bg-success bg-opacity-25  mb-5 shadow-md rounded-lg">
               
               

                <div className="flex items-center gap-2 bg-accent bg-opacity-15 px-2 py-3 rounded-lg shadow-md shadow-primary  transition-transform duration-300 ease-in-out hover:scale-[103%]">
                <img className="h-[30px]" src={shopcat} alt="" />
                 <p>Category: <span className="font-semibold">{shopData?.category}</span></p>
               </div>

                <div className="flex items-center gap-2 bg-accent bg-opacity-15 px-2 py-3 rounded-lg shadow-md shadow-primary  transition-transform duration-300 ease-in-out hover:scale-[103%]">
                    <img className="h-[30px]" src={shopduration} alt="" />
                    <p>Duration: <span className="font-semibold">{shopData?.features.duration} </span>Years</p>
                </div>

                <div className="flex items-center gap-2 bg-accent bg-opacity-15 px-2 py-3 rounded-lg shadow-md shadow-primary  transition-transform duration-300 ease-in-out hover:scale-[103%]">
                    <img className="h-[30px]" src={shopmaxcat} alt="" />
                    <p>Max Category: <span className="font-semibold">{shopData?.features.max_category} </span>Category</p>
                </div>
                <div className="flex items-center gap-2 bg-accent bg-opacity-15 px-2 py-3 rounded-lg shadow-md shadow-primary  transition-transform duration-300 ease-in-out hover:scale-[103%]">
                    <img className="h-[30px]" src={shopmaxprod} alt="" />
                    <p>Max Product: <span className="font-semibold">{shopData?.features.shop_size} </span>Products</p>
                </div>

                <div className="flex items-center gap-2 bg-accent bg-opacity-15 px-2 py-3 rounded-lg shadow-md shadow-primary  transition-transform duration-300 ease-in-out hover:scale-[103%]">
                    <img className="h-[30px]" src={shopprice} alt="" />
                    <p>Shop Price: <span className="font-semibold">{shopData?.price}</span> Tk</p>
                </div>

        
                
            </div>
            </div>
            <form className="flex flex-col md:flex-row justify-center items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
                <input className="input input-bordered input-primary w-full max-w-xs" type="text" placeholder="Shop Name" {...register("shopName")} />
                <select className="select select-primary w-full max-w-xs" {...register("shopType")}>
                    <option disabled selected>Shop Categories?</option>
                    {
                        shopData?.stall_types_list.map(type=> <option key={type} value={type}>{type}</option>)
                    }
                    
                </select>

                <button className="btn btn-primary" type="submit">Save</button>
            </form>
            <p className="text-primary text-center py-3">Trial Card Number: <CopyText text={'4242 4242 4242 4242'}></CopyText> Year Sould be more than 24 and CVC, Postal Code : Any digits</p>
            <Elements stripe={stripePromise}>
                <CheckOut price={shopData?.price} shopData={shopData} shopInfo={shopInfo}></CheckOut>
            </Elements>
        </div>
    );
};

export default PaymentShop;