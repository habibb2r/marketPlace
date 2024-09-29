import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useCart from "../../../../Hooks/useCart";
import remove from "../../../../icons/bin.png";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Rating } from "@smastrom/react-rating";
import { Slide } from "react-awesome-reveal";
import ico from "../../../../icons/004-shopping-cart.png";
import ict from "../../../../icons/userfull-cart.png";

const CartUser = () => {
  const [cart, , refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const totalPrice = cart.reduce((acc, item) => acc + item.cartData.price, 0);
  const handleRemoveCart = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove from cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/removeCart/${item._id}`).then((res) => {
          console.log(res.data);
          if (res.data?.result?.status) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Removed from cart`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
      }
    });

    console.log(item);
  };
  return (
    <div className="px-5">
      <SectionTitle ico={ico} ict={ict} title="Cart Items"></SectionTitle>

      <Slide direction="right">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead className="text-sm">
              <tr>
                <th>Item Name</th>
                <th>Shop</th>
                <th>Price</th>
                <th>Manage Items</th>
              </tr>
            </thead>
            <tbody>
              {cart.length == 0 ? (
                <tr className="flex justify-center items-center text-xl text-error font-semibold py-3 px-3">
                  No items left in Cart
                </tr>
              ) : (
                ""
              )}
              {cart.map((item) => (
                <tr
                  className="hover:shadow-md hover:shadow-success hover:bg-accent hover:bg-opacity-15 transition-transform duration-300 ease-in-out hover:scale-[102%]"
                  key={item._id}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.cartData.product_image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold w-[250px] uppercase">
                          {item.cartData.product_name}
                        </div>
                        <div className="text-sm">
                          <Rating
                            style={{ maxWidth: 100 }}
                            value={item.cartData.product_rating}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Link className="font-semibold">{item.cartData.stall}</Link>
                  </td>
                  <td className="font-semibold">{item.cartData.price} tk</td>
                  <td className="flex justify-center items-center gap-5">
                    <img
                      onClick={() => handleRemoveCart(item)}
                      className="h-[40px]"
                      src={remove}
                      alt=""
                    />
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th className="text-xl">
                  Total:{" "}
                  <span className="font-semibold text-secondary">
                    {totalPrice}
                  </span>
                </th>
                <th className="flex justify-center items-center ">
                  <Link to={`/dashboard/payment`} className="btn btn-success">
                    Pay
                  </Link>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </Slide>
    </div>
  );
};

export default CartUser;
