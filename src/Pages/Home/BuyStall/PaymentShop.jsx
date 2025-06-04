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
import shopcat from "../../../assets/basic/001-categorization.png";
import shopduration from "../../../assets/basic/002-hourglass.png";
import shopmaxcat from "../../../assets/basic/003-classification.png";
import shopmaxprod from "../../../assets/basic/004-products.png";
import shopprice from "../../../assets/basic/005-price-tag.png";
import CopyText from "../../Shared/CopyText/CopyText";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);
const PaymentShop = () => {
  const id = useParams();
  const [shopInfo, setShopInfo] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const { data: shopData, isLoading } = useQuery({
    queryKey: ["shopData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/shopData/${id.id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const onSubmit = (data) => setShopInfo(data);
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10">
          <SectionTitle title="Buy Shop"></SectionTitle>
          <p className="text-base-content/70 mt-2">
            Set up your shop and start selling today
          </p>
        </div>

        {/* Info Alert */}
        <div className="relative overflow-hidden bg-gradient-to-r from-accent to-accent/50 rounded-lg p-4 mb-8 transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-primary animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p className="text-primary font-medium">
                Please update your information before proceeding
              </p>
            </div>
            <Link
              className="btn btn-primary btn-sm normal-case hover:scale-105 transition-transform duration-200"
              to="/dashboard/userhome"
            >
              Update Profile
            </Link>
          </div>
        </div>

        {/* Shop Features Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="col-span-full">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Shop Features
            </h2>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <img className="h-8 w-8" src={shopcat} alt="Category" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Category</p>
                <p className="font-semibold text-lg">{shopData?.category}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <img className="h-8 w-8" src={shopduration} alt="Duration" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Duration</p>
                <p className="font-semibold text-lg">
                  {shopData?.features.duration} Years
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <img className="h-8 w-8" src={shopmaxcat} alt="Max Category" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Max Categories</p>
                <p className="font-semibold text-lg">
                  {shopData?.features.max_category}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <img className="h-8 w-8" src={shopmaxprod} alt="Max Products" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Max Products</p>
                <p className="font-semibold text-lg">
                  {shopData?.features.shop_size}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-full bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-md">
                <img className="h-10 w-10" src={shopprice} alt="Price" />
              </div>
              <div className="text-center">
                <p className="text-sm text-base-content/70">Total Price</p>
                <p className="font-bold text-2xl text-primary">
                  {shopData?.price}{" "}
                  <span className="text-sm font-normal">Tk</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Registration Form */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Shop Information
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Shop Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-primary w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  placeholder="Enter shop name"
                  {...register("shopName", { required: true })}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Shop Category</span>
                </label>
                <select
                  className="select select-primary w-full focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  {...register("shopType", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {shopData?.stall_types_list.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-center pt-4">
              <button
                type="submit"
                className="btn btn-primary btn-wide hover:scale-105 transform transition-transform duration-200"
              >
                Save Information
              </button>
            </div>
          </form>
        </div>

        {/* Payment Section */}
        <div className="space-y-6">
          {/* Test Card Info */}
          <div className="bg-info/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-info/20 to-transparent"></div>
            <div className="relative">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Test Card Details
              </h4>
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="bg-white px-4 py-2 rounded-lg shadow-md">
                  <p className="text-sm text-base-content/70">Card Number</p>
                  <div className="font-mono text-primary font-semibold flex items-center gap-2">
                    <CopyText text={"4242 4242 4242 4242"} />
                  </div>
                </div>
                <p className="text-sm text-base-content/70">
                  Use any future year (after 2024) for expiry, and any digits
                  for CVC & ZIP
                </p>
              </div>
            </div>
          </div>

          {/* Stripe Payment Element */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Elements stripe={stripePromise}>
              <CheckOut
                price={shopData?.price}
                shopData={shopData}
                shopInfo={shopInfo}
              ></CheckOut>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentShop;
