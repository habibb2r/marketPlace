import Loading from "../../../Shared/Loading/Loading";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useGetUserInfo from "../UserHooks/useGetUserInfo";
import pp from "../../../../icons/profile.png";
import useUserStat from "../UserHooks/useUserStat";
import { Slide } from "react-awesome-reveal";
import {
  FaShoppingCart,
  FaBox,
  FaMoneyBillWave,
  FaStar,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const UserHome = () => {
  const [ userInfo, , isLoading ] = useGetUserInfo();
  const { userStat } = useUserStat();

  console.log(userInfo);
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SectionTitle
        title="Welcome Back!"
        subHeading="Your Dashboard Overview"
      ></SectionTitle>

      <div className="container mx-auto px-4">
        <Slide direction="down" triggerOnce>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={userInfo?.photo || pp}
                  alt=""
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
                />
                <div className="absolute -bottom-2 right-0 bg-green-500 p-2 rounded-full">
                  <FaCheckCircle className="text-white" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {userInfo?.name || "Update Your Profile"}
                </h2>
                <p className="text-gray-600 mb-2">{userInfo?.email}</p>
                <p className="text-sm text-gray-500">
                  Member since:{" "}
                  {new Date(userInfo?.createdDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Slide>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Slide direction="up" cascade triggerOnce>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.03] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <FaShoppingCart className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-90">Total Orders</p>
                  <h3 className="text-2xl font-bold">
                    {userStat?.totalOrders || 0}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.03] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <FaBox className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-90">
                    Total Products
                  </p>
                  <h3 className="text-2xl font-bold">
                    {userStat?.totalProduct || 0}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.03] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <FaMoneyBillWave className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-90">Total Spent</p>
                  <h3 className="text-2xl font-bold">
                    ${userStat?.totalSpent.toFixed(2) || 0}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.03] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <FaStar className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-90">
                    Total Reviews
                  </p>
                  <h3 className="text-2xl font-bold">
                    {userStat?.totalReviews || 0}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.03] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <FaClock className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-90">
                    Pending Orders
                  </p>
                  <h3 className="text-2xl font-bold">
                    {userStat?.pendingOrders || 0}
                  </h3>
                </div>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
