import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import ico from "../../../../assets/for title/022-cost.png";
import ict from "../../../../assets/for title/021-crisis-management.png";
import sellerDelete from "../../../../assets/admin/png/trash.png";
import sellerUpdate from "../../../../assets/seller/update.png";
import useGetShopItems from "../SellerHooks/useGetShopItems";
import Loading from "../../../Shared/Loading/Loading";
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [getAllShopItems, refetch, shopItemLoad] = useGetShopItems();
  console.log(getAllShopItems);
  const axiosSecure = useAxiosSecure();
  if (shopItemLoad) {
    return <Loading></Loading>;
  }

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteItem/${id}`)
        .then((res) => {
          if (res.data) {
            refetch()
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle title="Manage Items" ico={ico} ict={ict}></SectionTitle>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead className="text-sm bg-secondary bg-opacity-25">
            <tr className="shadow-sm shadow-success rounded-md">
              <th>Item Info</th>
              <th>Price & Review</th>

              <th>Manage Item</th>
            </tr>
          </thead>
          <tbody className="bg-accent bg-opacity-15">
            {/* row 1 */}
            {getAllShopItems?.map((item) => (
              <tr
                className="shadow-inner shadow-success rounded-md transition-transform duration-300 ease-in-out hover:scale-[102%] hover:bg-accent hover:bg-opacity-20"
                key={item._id}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item?.product_image} alt="Profile Picture" />
                      </div>
                    </div>
                    <div>
                      <Link to={`/sellerdashboard/itemdetails/${item._id}`} className="font-bold w-[300px] overflow-ellipsis overflow-hidden whitespace-nowrap uppercase">
                        {item.product_name}
                      </Link>
                      <div className="text-sm font-mono">
                        {item.product_category}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {item?.product_price?.discount ? (
                    <p className="font-mono md:text-xl font-bold">
                      <span className="line-through text-error">
                        {item.product_price.present_price}
                      </span>{" "}
                      <span className="text-green-600">
                        {" "}
                        {item.product_price.previous_price} tk
                      </span>{" "}
                    </p>
                  ) : (
                    <p className="font-mono text-green-600 font-bold md:text-xl">
                      {item.product_price.present_price} tk
                    </p>
                  )}
                  <p className="flex gap-1 items-center">
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={item.product_rating}
                      readOnly
                    />{" "}
                    <span>({item.total_rated})</span>
                  </p>
                </td>
                <td>
                  <div className="flex items-center gap-5">
                    <Link to={`/sellerdashboard/updateitem/${item._id}`} state={{item}}>
                      <img
                        className="h-[40px] md:h-[50px]"
                        src={sellerUpdate}
                        alt=""
                      />
                    </Link>
                    <button onClick={() => handleDeleteItem(item._id)}>
                      <img
                        className="h-[40px] md:h-[50px]"
                        src={sellerDelete}
                        alt=""
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
