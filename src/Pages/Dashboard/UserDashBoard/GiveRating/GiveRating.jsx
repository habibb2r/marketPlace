import { Rating, ThinStar } from "@smastrom/react-rating";
import { useState } from "react";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useGetUserInfo from "../UserHooks/useGetUserInfo";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import ico from "../../../../assets/basic/003-review.png";
import ict from "../../../../assets/basic/004-rate.png";
import { Link } from "react-router-dom";
import prod from '../../../../assets/basic/001-box.png'
import marktplce from '../../../../assets/basic/003-online-shopping.png'
import stall from '../../../../assets/basic/002-market.png'
import myReview from '../../../../assets/basic/003-review.png'



const GiveRating = () => {


  return (
    <div>
      <SectionTitle ico={ico} ict={ict} title="Give a review"></SectionTitle>

      <div className="grid lg:grid-cols-2 gap-3 px-5 ">
        <Link to='product' className="bg-accent bg-opacity-20 rounded-lg shadow-md hover:bg-success hover:bg-opacity-20 transition-transform duration-300 ease-in-out hover:scale-[102%]">
        <div className="flex justify-center items-center gap-3 px-3 py-4">
          <img className="h-[35px]" src={prod} alt="" />
          <p className="font-semibold">Product Review</p>
        </div>
        </Link>

        <Link to='marketplace' className="bg-accent bg-opacity-20 rounded-lg shadow-md hover:bg-success hover:bg-opacity-20 transition-transform duration-300 ease-in-out hover:scale-[102%]">
        <div className="flex justify-center items-center gap-3 px-3 py-4">
          <img className="h-[35px]" src={marktplce} alt="" />
          <p className="font-semibold">Marketplace Review</p>
        </div>
        </Link>

        <Link to='stall' className="bg-accent bg-opacity-20 rounded-lg shadow-md hover:bg-success hover:bg-opacity-20 transition-transform duration-300 ease-in-out hover:scale-[102%]">
        <div className="flex justify-center items-center gap-3 px-3 py-4">
          <img className="h-[35px]" src={stall} alt="" />
          <p className="font-semibold">Stall Review</p>
        </div>
        </Link>

        <Link to='myReviews' className="bg-accent bg-opacity-20 rounded-lg shadow-md hover:bg-success hover:bg-opacity-20 transition-transform duration-300 ease-in-out hover:scale-[102%]">
        <div className="flex justify-center items-center gap-3 px-3 py-4">
          <img className="h-[35px]" src={myReview} alt="" />
          <p className="font-semibold">My Reviews</p>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default GiveRating;
