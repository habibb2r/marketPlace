import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import Lottie from "lottie-react";
import loginani from "./loginani.json";
import apndaani from "./pandalog.json";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log(location)
  console.log(from)

    const {signin, signInGoogle} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    signin(data.Email, data.Password)
    .then(result =>{
        const user = result.user;
        if(user){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Log in successfully",
            showConfirmButton: false,
            timer: 1500
          });
          reset()
          navigate(from, { replace: true });
        }
        console.log(user);
    })
  };

  const handleLogInWithGoogle = ()=>{
    signInGoogle()
    .then(result =>{
      console.log(result.user)
      if(result.user){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log in successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(from, { replace: true });
      }
    })
  }
  return (
    <div className="">
      <SectionTitle title="Login"></SectionTitle>
      <div className="py-[5%] flex justify-center items-center gap-16">
        <Lottie animationData={loginani}></Lottie>
        <div>
          <div>
            <Lottie
              className="h-[150px] py-3"
              animationData={apndaani}
            ></Lottie>
          </div>
          <form
            className="flex flex-col justify-center items-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="input input-bordered input-info w-full max-w-md"
              type="email"
              placeholder="Email"
              {...register("Email", { required: true })}
            />
            <input
              className="input input-bordered input-info w-full max-w-md"
              type="password"
              placeholder="Password"
              {...register("Password", {})}
            />

            <button className="btn btn-success px-5 py-3" type="submit">
              Login
            </button>
          </form>
          <div className="divider divider-primary">Or Login with</div>
          <div className="flex justify-center items-center gap-10">
            <button onClick={handleLogInWithGoogle} className="text-5xl rounded-full">
              <FcGoogle />
            </button>
            <button className="text-5xl rounded-full text-info">
              <FaFacebook />
            </button>
            <button className="text-5xl rounded-full">
              <FaGithub />
            </button>
          </div>
          <div className="text-center pt-5">
            <p className="font-semibold text-error">
              New User?{" "}
              <Link to='/signup' className="text-info font-bold">Signup here now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
