import { Link, useParams } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import { useForm } from "react-hook-form";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);
const PaymentShop = () => {
   const id = useParams();
   const [shopInfo, setShopInfo] = useState()
   console.log(id)

   const axiosSecure = useAxiosSecure();
   console.log(stripePromise)
   const {data: shopData, isLoading}= useQuery({
    queryKey: ['shopData'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/shopData/${id.id}`)
        return res.data
    }
   })
   
   if(isLoading){
    <Loading></Loading>
   }
   console.log(shopInfo)
   const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => setShopInfo(data);
    return (
        <div>
            <SectionTitle title='Buy Shop'></SectionTitle>
            <div className="flex justify-center items-center gap-4">
                <p className="text-error font-mono">Before buying please keep updated your Info</p>
                <Link className="btn btn-primary" to='/dashboard/userhome'>Update</Link>
            </div>
            <div className="flex justify-around items-center font-mono text-xl gap-5 p-5">
                <p>Category: <span className="font-semibold">{shopData?.category}</span></p>
                <div>
                <p>Duration: <span className="font-semibold">{shopData?.features.duration} </span>Years</p>
                <p>Max Category: <span className="font-semibold">{shopData?.features.max_category} </span>Category</p>
                <p>Max Product: <span className="font-semibold">{shopData?.features.shop_size} </span>Products</p>
                </div>
                <p>Shop Price: <span className="font-semibold">{shopData?.price}</span> Tk</p>
            </div>
            <form className="flex justify-center items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
                <input className="input input-bordered input-primary w-full max-w-xs" type="text" placeholder="Shop Name" {...register("shopName")} />
                <select className="select select-primary w-full max-w-xs" {...register("shopType")}>
                    <option disabled selected>Shop Categories?</option>
                    {
                        shopData?.stall_types_list.map(type=> <option key={type} value={type}>{type}</option>)
                    }
                    
                </select>

                <button className="btn btn-primary" type="submit">Save</button>
            </form>
            <Elements stripe={stripePromise}>
                <CheckOut price={shopData?.price} shopData={shopData} shopInfo={shopInfo}></CheckOut>
            </Elements>
        </div>
    );
};

export default PaymentShop;