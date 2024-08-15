import { Link } from "react-router-dom";

import Loading from "../../../Shared/Loading/Loading";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useGetUserInfo from "../UserHooks/useGetUserInfo";
import pp from '../../../../icons/profile.png'
import useUserStat from "../UserHooks/useUserStat";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { TbStars } from "react-icons/tb";
import { MdPendingActions } from "react-icons/md";
import { IoCloudDone } from "react-icons/io5";


const UserHome = () => {
    const [userInfo, , isLoading]= useGetUserInfo()
    const[stat, statLoad] = useUserStat();

    console.log(stat)
    if(isLoading || statLoad){
        return <Loading></Loading>
    }
    console.log(userInfo)
    return (
        <div>
            <SectionTitle title='Dashboard'></SectionTitle>
            <div className="flex justify-center items-center gap-5 pt-5">
                <div className="w-1/3 flex flex-col justify-center items-center gap-5">
                    <img className="rounded-xl h-[150px]" src={userInfo.picture?userInfo.picture: pp} alt="" />
                    <div className="flex flex-col justify-center items-start gap-2">
                        <p className="font-semibold">Name : {userInfo.name}</p>
                        <p className="font-semibold">Email : {userInfo.email}</p>
                        <p className="font-semibold">Phone : {userInfo.phone? userInfo.phone : "Update Profile"}</p>
                        <p className="font-semibold">Date of Birth : {userInfo.dob? userInfo.dob : "Update Profile"}</p>
                        <p className="font-semibold">Gender : {userInfo.gender? userInfo.gender : "Update Profile"}</p>
                        <p className="font-semibold text-secondary">Account Created : {userInfo.createdAt}</p>
                    </div>
                    <Link to='/dashboard/userUpdate' className="btn btn-secondary">Update Profile</Link>
                </div>
                <div className="grid grid-cols-1 gap-5">
                <div className="stats shadow">
  <div className="stat">
    <div className="stat-figure text-primary">
    <BsFillCartCheckFill className="text-2xl" />
    </div>
    <div className="stat-title">Total Cart</div>
    <div className="stat-value text-primary">{stat.cart}</div>
    <div className="stat-desc">Pay as soon as possible</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
    <FaListAlt className="text-2xl" />
    </div>
    <div className="stat-title">Ordered Item</div>
    <div className="stat-value text-secondary">{stat.totalOrder}</div>
    <div className="stat-desc">Give rating those items</div>
  </div>
  <div className="stat">
    <div className="stat-figure text-secondary">
    <GiMoneyStack className="text-2xl" />
    </div>
    <div className="stat-title">Total Spending</div>
    <div className="stat-value text-secondary">{stat.totalSpend}TK</div>
    <div className="stat-desc">Thats fair</div>
  </div>

  
</div>
<div className="stats shadow">
  <div className="stat">
    <div className="stat-figure text-primary">
    <TbStars className="text-2xl" />
    </div>
    <div className="stat-title">Total Rating</div>
    <div className="stat-value text-primary">{stat.totalRating}</div>
    <div className="stat-desc">We respect your opinion</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
    <MdPendingActions className="text-2xl" />
    </div>
    <div className="stat-title">Order Pending</div>
    <div className="stat-value text-secondary">{stat.pending}</div>
    <div className="stat-desc">Please wait</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
    <IoCloudDone className="text-2xl" />
    </div>
    <div className="stat-title">Order Received</div>
    <div className="stat-value text-secondary">{stat.delivered ? stat.delivered : '0'}</div>
    <div className="stat-desc">Enjoy</div>
  </div>


</div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;