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
    <div>
      <SectionTitle title="Admin Dashboard"></SectionTitle>
      <div className="bg-success bg-opacity-25 px-2 py-3 rounded-lg shadow-md shadow-primary flex flex-col lg:flex-row items-center lg:justify-between lg:gap-4 relative transition-transform duration-300 ease-in-out hover:scale-[102%]">
        <div className="flex flex-col lg:flex-row item-start lg:items-center gap-3">
          <img
            className="rounded-2xl shadow-md shadow-primary h-[150px] w-[150px]"
            src={userInfo?.picture}
            alt=""
          />
          <div className="flex flex-col items-start">
            <p className="adminname">{userInfo?.name}</p>
            <p className="font-mono font-semibold">{userInfo?.email}</p>
          </div>
        </div>
        <div className="flex flex-col lg:justify-between gap-3">
          <div>
            <div>
              <Link
                className="absolute right-1 top-1"
                to="/adminpanel/userupdate"
                state={mystate}
              >
                <div className="flex items-center gap-1">
                  <img className="h-[50px]" src={userUpdate} alt="" />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:absolute lg:bottom-2 lg:right-1">
            <img className="h-[30px]" src={created} alt="" />
            <p className="font-semibold font-mono">
              Account Created : {userInfo?.createdDate} {userInfo?.createdTime}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="">
          <div>
            <div className="bg-primary bg-opacity-10 px-3 py-5 shadow-lg shadow-success">
              <h2 className="font-bold text-xl font-mono py-4">
                Marketplace Statistics
              </h2>
              <div className="flex flex-col lg:flex-row items-center gap-3">
                <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-accent bg-opacity-15">
                  <div className="stat-figure text-secondary"></div>
                  <div className="stat-title">Total Shops</div>
                  <div className="stat-value text-secondary">
                    {adminstat?.totalShop}
                  </div>
                  <div className="stat-desc">Have in this marketplace</div>
                </div>

                <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-accent bg-opacity-15">
                  <div className="stat-figure text-secondary"></div>
                  <div className="stat-title">Total Products</div>
                  <div className="stat-value text-secondary">
                    {adminstat?.totalProducts}
                  </div>
                  <div className="stat-desc">Check out those items</div>
                </div>

                <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-accent bg-opacity-15">
                  <div className="stat-figure text-secondary"></div>
                  <div className="stat-title">Total Sales</div>
                  <div className="stat-value text-secondary">
                    {adminstat?.totalSales}
                  </div>
                  <div className="stat-desc">Fair Enough</div>
                </div>

                <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-accent bg-opacity-15">
                  <div className="stat-figure text-secondary"></div>
                  <div className="stat-title">Total Revenue</div>
                  <div className="stat-value text-secondary">
                    {adminstat?.totalRevenue} tk
                  </div>
                  <div className="stat-desc">More to Go</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminCharts></AdminCharts>
      <TypesofShop></TypesofShop>
    </div>
  );
};

export default AdminStat;
