import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import usePaymentHistory from "../UserHooks/usePaymentHistory";
import Loading from "../../../Shared/Loading/Loading";



const PayHistory = () => {
    const [payHistory,isLoading]= usePaymentHistory();
    if(isLoading){
        return <Loading></Loading>
    }
   
    return (
        <div>
            <SectionTitle title='Payment History'></SectionTitle>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead className='text-sm text-neutral bg-secondary rounded-xl'>
      <tr>
        
        <th className="border-2 border-accent">Item Name</th>
        <th className="border-2 border-accent">Price</th>
        <th className="border-2 border-accent">Quatity</th>
        <th className="border-2 border-accent">TrxID</th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
                    payHistory?.map(item=>  <tr key={item._id}>
                        <td className="border-2 border-primary">
                          <div className="flex items-center gap-3">
                            <div>
                                {
                                    item.itemNames.map(product => <div key={product} className="font-bold w-[250px] uppercase">✮ {product}</div>)
                                }
                                <div className="font-thin text-sm pt-2">{item.date}</div>
                                <div className="font-thin text-sm">{item.time}</div>
                              
                            </div>
                          </div>
                        </td>
                        <td className="border-2 border-primary">
                         <div className='font-semibold'>{item.price} tk</div>
                        </td>
                        <td className='font-semibold border-2 border-primary'>{item.quantity}</td>
                        <td className='border-2 border-primary'>
                          <div className="flex justify-start items-center ">
                          <p className="font-semibold">{item.traxId}</p>
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

export default PayHistory;