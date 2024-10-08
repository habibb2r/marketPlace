
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useGetAllShops from "../AdminHooks/useGetAllShops";
import trash from "../../../../assets/admin/png/trash.png";
import ids from "../../../../assets/admin/png/001-id.png";
import stalltype from "../../../../assets/admin/png/003-application.png";
import totalProducts from "../../../../assets/admin/png/002-cubes.png";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import { Rating } from "@smastrom/react-rating";
import sellerrev from "../../../../assets/for title/023-businessman-1.png";

const ManageShop = () => {
  const [allshops, refetch, loadShops] = useGetAllShops();
  const axiosSecure = useAxiosSecure();

  if (loadShops) {
    return <Loading></Loading>;
  }

  const handleDeleteShop = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this shop!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteShop/${id}`).then((res) => {
          if (res.data.status) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Shop has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <SectionTitle title="Manage Shops"></SectionTitle>

      <div className="stat text-center">
        <div className="stat-title">Total Shops</div>
        <div className="stat-value text-secondary">{allshops.length}</div>
        <div className="stat-desc">Check validity and conditions</div>
      </div>

      <div className="grid  gap-5 px-3">
        {allshops?.map((shop) => (
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-5 w-full bg-accent bg-opacity-25 shadow-lg shadow-success py-4 px-3 rounded-lg hover:bg-secondary hover:bg-opacity-25 "
            key={shop.shopId}
          >
            <div className="flex flex-col md:flex-row justify-start md:justify-between gap-5 items-start md:items-center py-2 w-full">
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-2xl font-sans font-bold">
                    {shop.shopName}
                  </h1>
                  <div className="flex items-center gap-1">
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={shop.averageRating}
                      readOnly
                    />
                    <p>({shop.totalRated})</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img className="h-[35px]" src={ids} alt="" />
                  <p className="font-semibold">
                    Shop ID : <span>{shop.shopId}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <img className="h-[35px]" src={totalProducts} alt="" />
                  <p className="font-sans font-semibold">
                    Total Products:{" "}
                    <span className="shadow-sm rounded-xl py-2 px-2 shadow-success">
                      {shop.totalProducts}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img className="h-[35px]" src={stalltype} alt="" />
                  <p className="font-sans font-semibold">
                    Shop Type:{" "}
                    <span className="shadow-sm rounded-xl py-2 px-2 shadow-success">
                      {shop.stallType}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 font-semibold justify-start">
                <img className="h-[35px]" src={sellerrev} alt="" />
                <p>Total Revenue : {shop.totalRevenue}</p>
              </div>
            </div>
            <div className="flex justify-center  py-2 rounded-md px-5">
              <img
                onClick={() => handleDeleteShop(shop.shopId)}
                className="h-[45px] w-[45px]"
                src={trash}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageShop;
