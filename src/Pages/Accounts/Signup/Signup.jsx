import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import ani from './Signupani.json'
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useGetUserInfo from "../../Dashboard/UserDashBoard/UserHooks/useGetUserInfo";
import { Slide } from "react-awesome-reveal";
import ico from '../../../assets/basic/003-sign-up.png'
import ict from '../../../assets/basic/004-add-friend.png'

const Signup = () => {
  const [,refetch, ] =useGetUserInfo()
  const navigate = useNavigate();
  // const location = useLocation();
  const from = "/";

  const today = new Date()
  const dateTimeString = today.toLocaleDateString();
  const timeString = today.toLocaleTimeString()
    const axiosSecure = useAxiosSecure()
    const{createUser} = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = data => {
    createUser(data.Email, data.Password)
    .then(result =>{
        const loggedUser = result.user;
        console.log(loggedUser)
        if(loggedUser.email){

            const userData = {
                email: loggedUser.email,
                name: data.name,
                picture: null,
                role: 'customer',
                createdDate: dateTimeString,
                createdTime: timeString
              }
              axiosSecure.post('/user', userData)
              .then(res=> {
                if(res.data){
                  refetch()
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Signed up successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset();
                  navigate(from, { replace: true });
                }
              })


        }
    })
   
    console.log(errors)
  };
  
    return (
        <div>
            <SectionTitle ico={ico} ict={ict} title='Signup Now'></SectionTitle>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 py-5">
              <Slide duration={1200} className="h-[350px]">
              <Lottie className="h-[350px]"  animationData={ani}></Lottie>
              </Slide>
                
            <form className="flex flex-col justify-center items-center gap-5" onSubmit={handleSubmit(onSubmit)}>
            <Slide direction="down" delay={1500}>
              <input  className="input input-bordered input-info w-full max-w-md" type="text" placeholder="Username" {...register("name", {})} />
            </Slide>
            <Slide direction="down" delay={1300}>
              <input  className="input input-bordered input-info w-full max-w-md" type="email" placeholder="Email" {...register("Email", {required: true})} />
            </Slide>
           <Slide direction="down" delay={1}>
             <input  className="input input-bordered input-info w-full max-w-md" type="password" placeholder="Password" {...register("Password", {required: true, max: 12, min: 4})} />

           </Slide>
            <button className="btn btn-success px-5 py-3" type="submit">Signup</button>
    </form>
            </div>
        </div>
    );
};

export default Signup;