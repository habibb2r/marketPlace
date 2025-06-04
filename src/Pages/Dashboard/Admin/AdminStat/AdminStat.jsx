import { Link, useLocation } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useGetUserInfo from "../../UserDashBoard/UserHooks/useGetUserInfo";
import "./adminname.css";
import created from "../../../../assets/for title/015-software-engineer.png";
import userUpdate from "../../../../assets/admin/png/setting.png";
import useAdminStats from "../AdminHooks/useAdminStats";
import Loading from "../../../Shared/Loading/Loading";
import AdminCharts from "./AdminCharts";
import TypesofShop from "./TypesofShop";

const AdminStat = () => {
  const [userInfo, , isLoading] = useGetUserInfo();
  const [adminstat] = useAdminStats();
  const location = useLocation();
  const mystate = location.pathname;

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className=" mx-auto space-y-6">
        {/* Header Section */}
        <div className="mb-8">
          <SectionTitle title="Admin Dashboard"></SectionTitle>
        </div>

        {/* Admin Profile Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="relative p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-success/10 via-primary/5 to-secondary/10"></div>
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Profile Info */}
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
                    <img
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      src={userInfo?.picture}
                      alt={userInfo?.name}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {userInfo?.name}
                  </h2>
                  <p className="text-gray-600 font-medium">{userInfo?.email}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <img className="h-5 w-5 opacity-70" src={created} alt="" />
                    <span>
                      Created: {userInfo?.createdDate} at{" "}
                      {userInfo?.createdTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Update Button */}
              <Link
                to="/adminpanel/userupdate"
                state={mystate}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-primary/10 transition-colors duration-200"
              >
                <img
                  className="h-6 w-6"
                  src={userUpdate}
                  alt="Update Profile"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-primary"
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
            Marketplace Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Shops Stats */}
            <div className="stats-card bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">Total Shops</p>
                  <p className="text-3xl font-bold mt-2">
                    {adminstat?.totalShop}
                  </p>
                  <p className="text-xs text-info mt-1">
                    Active in marketplace
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Products Stats */}
            <div className="stats-card bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-5 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold mt-2">
                    {adminstat?.totalProducts}
                  </p>
                  <p className="text-xs text-info mt-1">Items listed</p>
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sales Stats */}
            <div className="stats-card bg-gradient-to-br from-success/10 to-success/5 rounded-xl p-5 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="text-3xl font-bold mt-2">
                    {adminstat?.totalSales}
                  </p>
                  <p className="text-xs text-info mt-1">Completed orders</p>
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Revenue Stats */}
            <div className="stats-card bg-gradient-to-br from-info/10 to-info/5 rounded-xl p-5 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold mt-2">
                    {adminstat?.totalRevenue}{" "}
                    <span className="text-sm">tk</span>
                  </p>
                  <p className="text-xs text-info mt-1">Lifetime earnings</p>
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <AdminCharts />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <TypesofShop />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStat;
