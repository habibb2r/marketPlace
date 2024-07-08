import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import ani from './Signupani.json'
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const Signup = () => {
    
    const{createUser} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    createUser(data.Email, data.Password)
    .then(result =>{
        const loggedUser = result.user;
        console.log(loggedUser)
        if(loggedUser.email){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Signup succesfully",
                showConfirmButton: false,
                timer: 1500
              });
              <Navigate to='/'></Navigate>
        }
    })
   
    console.log(errors)
  };
  
    return (
        <div>
            <SectionTitle title='Signup Now'></SectionTitle>
            <div className="flex justify-center items-center gap-5 py-5">
                <Lottie  className="h-[350px]" animationData={ani}></Lottie>
            <form className="flex flex-col justify-center items-center gap-5" onSubmit={handleSubmit(onSubmit)}>
            <input  className="input input-bordered input-info w-full max-w-md" type="text" placeholder="Username" {...register("Username", {})} />
            <input  className="input input-bordered input-info w-full max-w-md" type="email" placeholder="Email" {...register("Email", {required: true})} />
            <input  className="input input-bordered input-info w-full max-w-md" type="password" placeholder="Password" {...register("Password", {required: true, max: 12, min: 4})} />

            <button className="btn btn-success px-5 py-3" type="submit">Signup</button>
    </form>
            </div>
        </div>
    );
};

export default Signup;