import { useLocation } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useSellerInfo from "../SellerHooks/useSellerInfo";


import ico from "../../../../assets/for title/006-businessman.png";
import ict from "../../../../assets/for title/023-businessman-1.png";

import Seller from "./Seller";
import Stall from "./Stall";
import useSellerStats from "../SellerHooks/useSellerStats";
import ShopSaleStat from "./ShopSaleStat";

const SellerProfile = () => {
  
  const location = useLocation();
  const mystate = location.pathname;
  const [sellerStats, , loadSellerStat] = useSellerStats();
  const [sellerInfo, , isLoading] = useSellerInfo();
  const today = new Date();

const dateOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
};

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true
};

const dateTimeString = today.toLocaleDateString('en-GB', dateOptions); // DD/MM/YYYY format
const timeString = today.toLocaleTimeString('en-US', timeOptions); // Hour: Minute : Seconds AM/PM format

console.log(today, dateTimeString, timeString);

  if (isLoading || loadSellerStat) {
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
        <div className="grid grid-cols-3 gap-2 px-1 py-4">
          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title flex flex-col md:flex-row justify-start items-start gap-1">
              <span className="stat-title" >
                Total Products{" "} <br />
                <span className="font-semibold text-primary">Max: {stallInfo.shop_size}</span>
              </span>
            </div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalProducts}
            </div>
            <div className="stat-desc">Have in this Stall</div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title flex flex-col md:flex-row justify-start items-start gap-2">
              <span>
              Total Categories{" "} <br />
              <span className="font-semibold text-primary">
                Max: {stallInfo.max_category}
              </span>
              </span>
              
            </div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalCategories}
            </div>
            <div className="stat-desc">Have in this Stall</div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Sales</div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalSales}
            </div>
            <div className="stat-desc">More to go</div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Revenue</div>
            <div className="text-secondary text-xl font-extrabold">
              {sellerStats?.totalRevenue} tk
            </div>
            <div className="stat-desc">Fair Enough</div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Delivered</div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalDeliverd}
            </div>
            <div className="stat-desc">Great</div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Pendings</div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalPending}
            </div>
            <div className="stat-desc">Deliver fast</div>
          </div>
        </div>
        <ShopSaleStat></ShopSaleStat>
 
      </div>
    </div>
  );
};

export default SellerProfile;
