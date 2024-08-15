import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import usePaymentHistory from "../UserHooks/usePaymentHistory";
import Loading from "../../../Shared/Loading/Loading";
import { Link } from "react-router-dom";
import { useState } from "react";


const PayHistory = () => {
    const [payHistory,isLoading]= usePaymentHistory();
    const [dateTime, setTime] = useState({})
    console.log(dateTime)
    if(isLoading){
        return <Loading></Loading>
    }
   
    return (
        <div>
            <SectionTitle title='Payment History'></SectionTitle>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead className='text-sm'>
      <tr>
        
        <th>Item Name</th>
        <th>Price</th>
        <th>Quatity</th>
        <th>TrxID</th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
                    payHistory?.map(item=>  <tr key={item._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div>
                                {
                                    item.itemNames.map(product => <div key={product} className="font-bold w-[300px] uppercase">➵ {product}</div>)
                                }
                                <div className="font-thin text-sm pt-2">{item.date}</div>
                                <div className="font-thin text-sm">{item.time}</div>
                              
                            </div>
                          </div>
                        </td>
                        <td>
                         <div className='font-semibold'>{item.total_price} tk</div>
                        </td>
                        <td className='font-semibold'>{item.quantity}</td>
                        <td className=''>
                            <p className="flex justify-start items-start gap-5 font-semibold">{item.traxId}</p>
                          
                        </td>
                      </tr>)
                }
  
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PayHistory;