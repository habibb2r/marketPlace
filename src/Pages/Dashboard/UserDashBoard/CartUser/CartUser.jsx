import React from 'react';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import useCart from '../../../../Hooks/useCart';
import remove from '../../../../icons/bin.png'
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CartUser = () => {
    const [cart, ,refetch] = useCart()
    const axiosSecure = useAxiosSecure()
    console.log(cart)
    const handleRemoveCart =(item)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to remove from cart",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/removeCart/${item._id}`)
        .then(res=>{
            console.log(res.data)
            if(res.data){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Removed from cart`,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                refetch()
                
            }
        })
               
            }
          });
        
        console.log(item)
    }
    return (
        <div className='px-3'>
            <SectionTitle title='Cart Items'></SectionTitle>


<div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead className='text-sm'>
      <tr>
        
        <th>Item Name</th>
        <th>Shop</th>
        <th>Price</th>
        <th>Manage Items</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
                    cart.map(item=>  <tr key={item._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={item.product_image}
                                  alt="Avatar Tailwind CSS Component" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold w-[250px] uppercase">{item.product_name}</div>
                              <div className="text-sm opacity-50">United States</div>
                            </div>
                          </div>
                        </td>
                        <td>
                         <Link className='font-semibold'>{item.shop}</Link>
                        </td>
                        <td className='font-semibold'>{item.price} tk</td>
                        <td className='flex justify-start items-center gap-5'>
                            <img onClick={()=>handleRemoveCart(item)} className="h-[40px]" src={remove} alt="" />
                          <button className="btn btn-success">Pay</button>
                        </td>
                      </tr>)
                }
  
    </tbody>

    <tfoot>
    <tr>
        
        <th>Item Name</th>
        <th>Shop</th>
        <th>Price</th>
        <th>Manage Items</th>
      </tr>
    </tfoot>
  </table>
</div>
            
        </div>
    );
};

export default CartUser;