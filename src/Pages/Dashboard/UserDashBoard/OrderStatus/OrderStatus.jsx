import Loading from "../../../Shared/Loading/Loading";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useOrderStatus from "../UserHooks/useOrderStatus";
import statusOk from '../../../../assets/check.png'
import statusPen from '../../../../assets/pending.png'
import { CiShoppingTag } from "react-icons/ci";

const OrderStatus = () => {
    const [orderStatus, orderLoad] = useOrderStatus();
    if(orderLoad){
        return <Loading></Loading>
    }
    return (
        <div>
            <SectionTitle title='Order Status'></SectionTitle>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead className='text-sm'>
      <tr>
        
        <th>Item Information</th>
        <th>Payment Date & Time</th>
        <th>Status</th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
                    orderStatus?.map(item=>  <tr key={item._id}>
                        <td>
                          <div className="flex items-center">
                            <div>
                                {
                                    item.itemNames.map(product => <div key={product} className="font-bold w-[350px] uppercase flex items-start gap-1 py-2"><CiShoppingTag /><span>{product}</span></div>)
                                }
                                <div className="font-light text-sm pt-2">Quantity : {item.quantity}</div>
                                <div className="font-light text-sm">{item.total_price} Tk</div>
                              
                            </div>
                          </div>
                        </td>
                        <td>
                         <div className="flex flex-col justify-start items-start ">
                         <div className='font-semibold'>{item.date}</div>
                         <div className='font-semibold'>{item.time}</div>
                         </div>
                        </td>
                       
                        <td >
                            <div className='flex flex-col justify-start items-start gap-5'>
                                <div className="flex justify-start items-center gap-2">
                                <p className="font-semibold">Payment-</p>
                                {item.payment_status? <img className="h-[20px]" src={statusOk} alt="" />: <img className="h-[30px]" src={statusPen} alt="" /> }
                                </div>
                                <div className="flex justify-start items-center gap-2">
                                <p className="font-semibold">Delivery-</p>
                            {item.delivered? <img className="h-[20px]" src={statusOk} alt="" />: <img className="h-[30px]" src={statusPen} alt="" /> }
                                </div>
                            
                            
                            </div>
                           
                          
                        </td>
                      </tr>)
                }
  
    </tbody>
  </table>
</div>
        </div>
    );
};

export default OrderStatus;