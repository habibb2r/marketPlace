import { Link } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useSellerInfo from "../SellerHooks/useSellerInfo";
import shopIcon from '../../../../icons/006-store.png'
import userName from "../../../../assets/seller/001-agent.png"
import userBirth from "../../../../assets/seller/005-pediatrics.png"
import userEmail from "../../../../assets/seller/002-gmail.png"
import userPhone from "../../../../assets/seller/003-add-contact.png"
import userUpdate from "../../../../assets/seller/004-updated.png"
import userGender from "../../../../assets/seller/006-equality.png"
import userDate from "../../../../assets/seller/008-calendar.png"
import userRole from "../../../../assets/seller/007-management.png"
import userTime from "../../../../assets/seller/009-clock.png"
import ico from '../../../../assets/for title/006-businessman.png'
import ict from '../../../../assets/for title/023-businessman-1.png'

const SellerProfile = () => {
  const [sellerInfo, , isLoading] = useSellerInfo();
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(sellerInfo);
  return (
    <div>
      <SectionTitle title="Seller Profile" ico={ico} ict={ict}></SectionTitle>
      <div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-gray-500 bg-opacity-15 rounded-md px-4 py-5 shadow-md shadow-blue-400">
            <div className="flex flex-col md:flex-row justify-start items-center gap-4">
              <img
                className="rounded-2xl h-[120px] w-[120px] md:h-[150px] md:w-[150px] shadow-lg shadow-primary"
                src={sellerInfo.sellerBio?.picture}
                alt=""
              />
              <div className="flex flex-col  md:justify-center items-start md:items-center  gap-3 font-semibold font-sans">
                <div className="flex flex-col justify-start items-start gap-4">
                  <div className="flex items-center gap-2">
                  <img className="h-[20px]" src={userName} alt="" /> 
                  <h2 className="text-xl">{sellerInfo.sellerBio?.name}</h2>
                  </div>
                  
                  <div className="flex items-center gap-2">
                  <img className="h-[15px]" src={userEmail} alt="" />
                  <h2 className="text-md">{sellerInfo.sellerBio?.email}</h2>
                  </div>
                  
                  <div className="flex items-center gap-2">
                  <img className="h-[20px]" src={userPhone} alt="" />
                  <h2 className="text-md">
                    {sellerInfo.sellerBio?.phone
                      ? sellerInfo.sellerBio.phone
                      : <span className="text-error">Update Profile</span>}
                  </h2>
                  </div>
                  
                  <Link
                  className=""
                  to="/sellerdashboard/userupdate"
                >
                  <div className="flex items-center gap-1">
                    <img className="h-[50px]" src={userUpdate} alt="" />
                  </div>
                </Link>
                </div>
                
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold border-b-2 border-secondary py-2">Addtional Information</h1>
              <div className="flex flex-col md:flex-row justify-between items-start font-sans gap-4 py-3">
                <div className="flex items-center gap-2"><img className="h-[40px]" src={userBirth} alt="" /><span className="font-semibold">{sellerInfo.sellerBio?.dob}</span> </div>
                <p className="flex items-center gap-2"><img className="h-[40px]" src={userGender} alt="" /><span className="font-semibold">{sellerInfo.sellerBio?.gender}</span></p>
                <p className="flex items-center gap-2"><img className="h-[40px]" src={userRole} alt="" /> <span className="font-semibold">{sellerInfo.sellerBio?.role}</span></p>
                
                
              </div>
              <div className="flex flex-col md:flex-row justify-start items-start gap-3 py-3">
                  <p className="border-b-2 border-secondary"><span className="font-semibold">Account Created</span> :</p>
                  <div className="flex items-center justify-around gap-4">
                    <p className="flex items-center gap-2"> <img className="h-[40px]" src={userDate} alt="" /><span className="font-semibold">{sellerInfo.sellerBio?.createdDate}</span></p>
                    <p className="flex items-center gap-2"> <img className="h-[40px]" src={userTime} alt="" /><span className="font-semibold">{sellerInfo.sellerBio?.createdTime}</span></p>
                  </div>
                </div>
            </div>
          </div>
          <div>
            <div className="bg-secondary bg-opacity-10 px-3 py-5 rounded-lg shadow-inner shadow-success">
              <div className=" flex items-center gap-2 border-b-2 border-success py-3">
              <img className="h-[40px]" src={shopIcon} alt="" />
              <p className="text-xl font-semibold ">Stall Information</p>
              </div>
              <div className="font-sans py-3 bg-secondary bg-opacity-15 px-2 shadow-inner shadow-success rounded-xl">
                <p className="">Name : <span className="text-xl font-semibold">{sellerInfo.sellerProfile?.stall_name}</span></p>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 py-3">
                <p className="">Type : <span className="font-semibold">{sellerInfo.sellerProfile?.stall_type}</span></p>
                <p>Category : <span className="font-semibold">{sellerInfo.sellerProfile?.stall_quality}</span></p>
                
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <p>Stall ID : <span className="font-semibold">{sellerInfo.sellerProfile?.stall_id}</span></p>
                <p>Purchase Date : <span className="font-semibold">{sellerInfo.sellerProfile?.date}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
