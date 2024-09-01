import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import usePaymentHistory from "../UserHooks/usePaymentHistory";
import Loading from "../../../Shared/Loading/Loading";
import { Link } from "react-router-dom";
import { useState } from "react";
import ico from "../../../../assets/basic/005-payment.png";
import ict from "../../../../assets/basic/006-payment-1.png";

const PayHistory = () => {
  const [payHistory, isLoading] = usePaymentHistory();
  // const [dateTime, setTime] = useState({});

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <SectionTitle ico={ico} ict={ict} title="Payment History"></SectionTitle>
      <div className="overflow-x-auto w-full shadow-sm shadow-secondary">
        <table className="table w-full">
          {/* head */}
          <thead className="text-sm">
            <tr className="bg-secondary bg-opacity-15 shadow-md shadow-success">
              <th>Item Name</th>
              <th>Price</th>
              <th>Quatity</th>
              <th>TrxID</th>
            </tr>
          </thead>
          <tbody className="bg-accent bg-opacity-15">
            {payHistory.length == 0 ? (
              <tr className="flex justify-center items-center text-xl text-error font-semibold py-3 px-3">
                No payments have done yet...
              </tr>
            ) : (
              ""
            )}
            {payHistory?.map((item) => (
              <tr
                className="px-2 shadow-inner shadow-success hover:bg-success hover:bg-opacity-30"
                key={item._id}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      {item.itemNames.map((product) => (
                        <div
                          key={product}
                          className="font-bold w-[300px] uppercase"
                        >
                          ➵ {product}
                        </div>
                      ))}
                      <div className="font-thin text-sm pt-2">{item.date}</div>
                      <div className="font-thin text-sm">{item.time}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-semibold">{item.total_price} tk</div>
                </td>
                <td className="font-semibold">{item.quantity}</td>
                <td className="">
                  <p className="flex justify-start items-start gap-5 font-semibold">
                    {item.traxId}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayHistory;
