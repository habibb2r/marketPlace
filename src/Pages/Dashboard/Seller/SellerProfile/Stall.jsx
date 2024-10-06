import useSellerStats from "../SellerHooks/useSellerStats";
import shopIcon from "../../../../icons/006-store.png";



const Stall = ({stallInfo}) => {
    const [sellerStats, refetch, loadSellerStat] = useSellerStats();
    console.log(sellerStats);
  return (
    <div>
      <div className="bg-secondary bg-opacity-10 px-3 py-5 rounded-lg shadow-inner shadow-success ">
        <div className=" flex items-center gap-2 py-3">
          <img className="h-[40px]" src={shopIcon} alt="" />
          <p className="text-xl font-semibold ">Stall Information</p>
        </div>
        <div className="font-sans py-3 bg-secondary bg-opacity-15 px-2 shadow-inner shadow-success rounded-xl transition-transform duration-300 ease-in-out hover:scale-105">
          <p className="">
            Name :{" "}
            <span className="text-xl font-semibold">
              {stallInfo.stall_name}
            </span>
          </p>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 py-3">
            <p className="">
              Type :{" "}
              <span className="font-semibold">
                {stallInfo.stall_type}
              </span>
            </p>
            <p>
              Category :{" "}
              <span className="font-semibold">
                {stallInfo.stall_quality}
              </span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <p>
              Stall ID :{" "}
              <span className="font-semibold">
                {stallInfo.stall_id}
              </span>
            </p>
            <p>
              Purchase Date :{" "}
              <span className="font-semibold">
                {stallInfo.date}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 px-3 py-4">
          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Items</div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalProducts}
            </div>
            <div className="stat-desc">Have in this Stall</div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Categories</div>
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
            <div className="stat-title">Total Deliverd</div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalDeliverd}
            </div>
            <div className="stat-desc">Great </div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Pendings</div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalPending}
            </div>
            <div className="stat-desc">Deliver as soon as possible</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stall;
