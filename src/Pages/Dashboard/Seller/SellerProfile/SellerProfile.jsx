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

  if (isLoading || loadSellerStat) {
    return <Loading></Loading>;
  }
  const seller = sellerInfo?.sellerBio;
  const stallInfo = sellerInfo?.sellerProfile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4">
      <div className="mb-8">
        <SectionTitle title="Seller Profile" ico={ico} ict={ict}></SectionTitle>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile and Stall Info */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Seller seller={seller} mystate={mystate}></Seller>
          <Stall stallInfo={stallInfo}></Stall>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Products Stats */}
          <div className="stats-card bg-gradient-to-br from-success/10 to-success/5 rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Products
                </h3>
                <p className="text-3xl font-bold mt-2">
                  {sellerStats?.totalProducts}
                </p>
                <p className="text-xs text-info mt-1">
                  Max: {stallInfo.shop_size}
                </p>
              </div>
              <div className="bg-success/20 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-info"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Categories Stats */}
          <div className="stats-card bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Categories
                </h3>
                <p className="text-3xl font-bold mt-2">
                  {sellerStats?.totalCategories}
                </p>
                <p className="text-xs text-info mt-1">
                  Max: {stallInfo.max_category}
                </p>
              </div>
              <div className="bg-primary/20 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-info"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Sales Stats */}
          <div className="stats-card bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Sales
                </h3>
                <p className="text-3xl font-bold mt-2">
                  {sellerStats?.totalSales}
                </p>
                <p className="text-xs text-info mt-1">More to go</p>
              </div>
              <div className="bg-secondary/20 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-info"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="stats-card bg-gradient-to-br from-info/10 to-info/5 rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Revenue
                </h3>
                <p className="text-3xl font-bold mt-2">
                  {sellerStats?.totalRevenue}{" "}
                  <span className="text-sm">tk</span>
                </p>
                <p className="text-xs text-info mt-1">Fair Enough</p>
              </div>
              <div className="bg-info/20 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-info"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Delivered Stats */}
          <div className="stats-card bg-gradient-to-br from-success/10 to-success/5 rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Delivered
                </h3>
                <p className="text-3xl font-bold mt-2">
                  {sellerStats?.totalDeliverd}
                </p>
                <p className="text-xs text-info mt-1">Great</p>
              </div>
              <div className="bg-success/20 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-info"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Stats */}
          <div className="stats-card bg-gradient-to-br from-warning/10 to-warning/5 rounded-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Pendings
                </h3>
                <p className="text-3xl font-bold mt-2">
                  {sellerStats?.totalPending}
                </p>
                <p className="text-xs text-info mt-1">Deliver fast</p>
              </div>
              <div className="bg-warning/20 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-info"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
          <ShopSaleStat></ShopSaleStat>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
