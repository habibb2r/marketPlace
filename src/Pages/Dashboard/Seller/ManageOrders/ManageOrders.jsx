import { Link } from "react-router-dom";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useManageOrders from "../SellerHooks/useManageOrders";
import statusOk from "../../../../assets/check.png";
import statusPen from "../../../../assets/pending.png";
import details from "../../../../icons/info.png";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading/Loading";
import { AiFillProduct } from "react-icons/ai";
import { GiIdCard, GiPriceTag } from "react-icons/gi";
import { MdOutlineTimer, MdPayment, MdProductionQuantityLimits } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

const ManageOrders = () => {
  const [getOrderSeller, refetch, orderLoading] = useManageOrders();
  const axiosSecure = useAxiosSecure();

  if (orderLoading) {
    return <Loading></Loading>;
  }

  const handleDelivery = (id) => {
    Swal.fire({
      title: "Is Your Client Received Product?",
      text: "Make sure your client received the product",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delivered!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.put(`/orderDelivery/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.result.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Delivered",
              text: "Order Delivered Successfully",
              icon: "success",
              timer: 1500,
            });
          }
        });
      }
    });
  };
  console.log(getOrderSeller);
  return (
    <div>
      <SectionTitle title="Manage Orders"></SectionTitle>
      <div className="px-5 grid md:grid-cols-2 py-5 gap-5">
        {getOrderSeller?.map((order) => (
          <div
            className="px-3 py-4 shadow-md shadow-success rounded-md relative pb-[60px] bg-accent bg-opacity-15"
            key={order._id}
          >
            <div className="flex flex-col justify-start gap-4">
              <div className="flex flex-col justify-start items-start gap-3 bg-secondary bg-opacity-15 px-2 py-3 rounded-md">
                {order?.itemNames.map((item, index) => (
                  <div
                    className="flex justify-between items-center gap-2"
                    key={item}
                  >
                    <p className="w-[270px] md:w-[400px] font-semibold font-mono flex items-start gap-1">
                      <span className="text-secondary"><AiFillProduct className="text-xl text-error" /></span> <span>{item} (
                        {order.product_prices[index]} tk)</span>
                    </p>
                    <Link to={`/details/${order.product_items[index]}`}>
                      <img className="h-[35px] w-[35px]" src={details} alt="" />
                    </Link>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center gap-2 font-mono">
                <p className="flex items-center gap-1 "><GiPriceTag className="text-xl text-error" /><span><span className="font-semibold">Total Price:</span> {order.total_price} tk</span> </p>
                <p className="flex items-center gap-1"><MdProductionQuantityLimits className="text-xl text-error" /><span><span className="font-semibold">Quantity:</span> {order.quantity}</span></p>
              </div>
              <div className="font-mono">
                <p className="flex items-center gap-1 ">
                <MdOutlineTimer className="text-xl text-error" />
                  <span><span className="font-semibold">Order Date and Time :</span> {order.date} {order.time}</span>
                 
                </p>
              </div>
              <div className="font-mono">
                <div className="flex items-center gap-1 "><FaUserAlt className="text-xl text-error" /><span><span className="font-semibold">User:</span> {order.email}</span></div>
              </div>
              <div className="font-mono flex flex-col items-start px-2 bg-primary bg-opacity-20 rounded-md py-2 gap-2">
                <p className="flex items-center gap-3 font-semibold">
                  <div className="flex items-center gap-1"><span><MdPayment className="text-xl text-error" /></span><span className="font-semibold">Payment:</span></div>
                  {order.payment_status ? (
                    <img className="h-[25px]" src={statusOk} alt="" />
                  ) : (
                    <img className="h-[25px]" src={statusPen} alt="" />
                  )}{" "}
                </p>
                <div className="flex items-center gap-1"><GiIdCard className="text-xl text-error" /><span><span className="font-semibold">Payment ID:</span> {order.traxId}</span></div>
              </div>
              <div className="font-mono">
                <p className="flex items-center gap-3 font-semibold">
                  <div className="flex items-center gap-1"><TbTruckDelivery className="text-xl text-error" /> <span className="font-semibold">Delivery:</span></div>{" "}
                  {order.delivered ? (
                    <img className="h-[25px]" src={statusOk} alt="" />
                  ) : (
                    <img className="h-[25px]" src={statusPen} alt="" />
                  )}
                </p>
              </div>
              <div className="absolute bottom-3 right-3">
                {order.delivered ? (
                  <button className="btn btn-success disabled">
                    Already Deliverd
                  </button>
                ) : (
                  <button
                    onClick={() => handleDelivery(order._id)}
                    className="btn btn-secondary"
                  >
                    Procced to deliver
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
