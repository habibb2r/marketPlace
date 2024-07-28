
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import useManageUser from '../AdminHooks/useManageUser';
import manageuser from '../../../../assets/admin/png/setting.png'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUser = () => {
    const [manageUsers] =useManageUser();
    const axiosSecure = useAxiosSecure();
 
    const handleManageUser = (user)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want make this user as Admin",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                console.log(user)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
        
    }
    return (
        <div>
            <SectionTitle title='Manage Clients'></SectionTitle>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead className='text-sm'>
      <tr>
        
        <th>User Profile</th>
        <th>Account Created</th>
        <th>User Role</th>
        <th>Manage Account</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
                    manageUsers.map(user=>  <tr key={user._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={user?.picture}
                                  alt="Profile Picture" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold w-[250px] uppercase">{user.name}</div>
                            <div className='text-sm font-mono'>{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                         <p className='font-mono'>Date: {user.createdDate}</p>
                         <p className='font-mono'>Time: {user.createdTime}</p>
                        </td>
                        <td>
                        <div className="badge px-4 py-4 font-semibold badge-accent">{user.role}</div>
                        </td>
                        <td className='flex justify-center items-center gap-5'>
                            <img onClick={()=>handleManageUser(user)} className="h-[40px]" src={manageuser} alt="" />
                          
                        </td>
                      </tr>)
                }
  
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageUser;