import Loading from "../../../Shared/Loading/Loading";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useOrderStatus from "../UserHooks/useOrderStatus";
import statusOk from '../../../../assets/check.png'
import statusPen from '../../../../assets/pending.png'
import { CiShoppingTag } from "react-icons/ci";
import ico from '../../../../assets/basic/007-delivery.png'
import ict from '../../../../assets/basic/008-travel.png'

const OrderStatus = () => {
    const [orderStatus, , orderLoad] = useOrderStatus();
    if(orderLoad){
        return <Loading></Loading>
    }
    return (
        <div>
            <SectionTitle ico={ico} ict={ict} title='Order Status'></SectionTitle>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead className='text-sm'>
      <tr className="bg-accent bg-opacity-20 shadow-md shadow-accent">
        
        <th>Item Information</th>
        <th>Payment Date & Time</th>
        <th>Status</th>
        
      </tr>
    </thead>
    <tbody>
    {
              orderStatus.length == 0 ? <tr className="flex justify-center items-center text-xl text-error font-semibold py-3 px-3">No orders have placed yet...</tr> : ''
            }
      {
                    orderStatus?.map(item=>  <tr className="bg-success bg-opacity-10 shadow-inner shadow-success hover:bg-accent hover:bg-opacity-10 transition-transform duration-300 ease-in-out hover:scale-[102%]" key={item._id}>
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