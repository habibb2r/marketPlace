import { Link, useLocation } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useSellerInfo from "../SellerHooks/useSellerInfo";


import ico from "../../../../assets/for title/006-businessman.png";
import ict from "../../../../assets/for title/023-businessman-1.png";
import useSellerStats from "../SellerHooks/useSellerStats";
import Seller from "./Seller";
import Stall from "./Stall";

const SellerProfile = () => {
  const location = useLocation();
  const mystate = location.pathname;

  const [sellerInfo, , isLoading] = useSellerInfo();

  if (isLoading) {
    return <Loading></Loading>;
  }
  const seller = sellerInfo?.sellerBio
  const stallInfo = sellerInfo?.sellerProfile
  return (
    <div>
      <SectionTitle title="Seller Profile" ico={ico} ict={ict}></SectionTitle>
      <div>
        <div className="grid md:grid-cols-2 gap-10">
          <Seller seller={seller} mystate={mystate}></Seller>
          <Stall stallInfo={stallInfo}></Stall>
        </div>
 
      </div>
    </div>
  );
};

export default SellerProfile;
