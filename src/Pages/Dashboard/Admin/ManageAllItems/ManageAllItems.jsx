import { Rating } from "@smastrom/react-rating";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useManageAllItems from "../AdminHooks/useManageAllItems";
import { Link } from "react-router-dom";
import trash from '../../../../assets/admin/png/trash.png'
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";


const ManageAllItems = () => {
    const [ manageAllItems, refetch, isLoading] = useManageAllItems();
    if(isLoading){
        <Loading></Loading>
    }
    const axiosSecure = useAxiosSecure()
    const handleDeleteItems= (item)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/manageAllItems/${item._id}`)
                .then(res=>{
                    if(res.data.deletedCount){
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
              
            }
          });
      
    }

    return (
        <div>
            <SectionTitle title='Manage All Items'></SectionTitle>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead className='text-sm'>
      <tr>
        
        <th>Item Information</th>
        <th>Price and Review</th>
        <th>Stall</th>
        <th>Remove Item</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
                    manageAllItems.map(item=>  <tr key={item._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-[60px] w-[60px]">
                                <img
                                  src={item?.product_image}
                                  alt="Profile Picture" />
                              </div>
                            </div>
                            <div className="w-[250px]">
                              <Link to={`/details/${item._id}`} className="font-bold  uppercase">{item.product_name}</Link>
                            <div className='text-sm font-mono'>Type: {item.product_category}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                         <p className='font-mono'>Price: {item.product_price.present_price}</p>
                         <Rating style={{ maxWidth: 100 }} value={item.product_rating} readOnly />
                        </td>
                        <td>
                        <Link to={`/shopDetails/${item.stall.id}`} className='font-semibold text-primary'>{item.stall.name}</Link>
                        </td>
                        <td className=''>
                            <img onClick={()=>handleDeleteItems(item)} className="h-[45px]" src={trash} alt="" />
                          
                        </td>
                      </tr>)
                }
  
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageAllItems;