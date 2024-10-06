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
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useGetUserInfo from "../../Dashboard/UserDashBoard/UserHooks/useGetUserInfo";
import { AttentionSeeker, Slide } from "react-awesome-reveal";
import ico from '../../../assets/basic/001-key.png'
import ict from '../../../assets/basic/002-profile.png'

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date()
  const dateTimeString = today.toLocaleDateString();
  const timeString = today.toLocaleTimeString()
  const [,refetch, ] =useGetUserInfo()

  const from = location.state?.from?.pathname || "/";

const axiosSecure = useAxiosSecure();
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
          refetch()
          navigate(from, { replace: true });
        }
        console.log(user);
    })
  };

  const handleLogInWithGoogle = ()=>{
    signInGoogle()
    .then(result =>{
      if(result.user){
        const data = {
          email: result.user.email,
          name: result.user.displayName,
          picture: result.user.photoURL,
          role: 'customer',
          createdDate: dateTimeString,
          createdTime: timeString
        }
        console.log(data);
        axiosSecure.post('/user', data)
        .then(res=> {
          if(res.data){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Log in successfully",
              showConfirmButton: false,
              timer: 1500
            });
            refetch();
            navigate(from, { replace: true });
          }
        })
      }
    })
  }
  return (
    <div className="">
      <SectionTitle ico={ico} ict={ict} title="Login"></SectionTitle>
      <div className="py-[3%] flex flex-col md:flex-row justify-center items-center gap-5 md:gap-16">
        <Slide direction="left" className="h-[250px] md:h-full">
        <Lottie className="h-[250px] md:h-full"  animationData={loginani}></Lottie>
        </Slide>
       <Slide direction="right">
       <div>
          <div>
            <Lottie
              className="hidden md:block h-[150px] py-3 "
              animationData={apndaani}
            ></Lottie>
          </div>
          <AttentionSeeker effect="jello" delay={1800} duration={1200}>
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
          </AttentionSeeker>
          <div className="divider divider-primary">Or continue with</div>
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
       </Slide>
      </div>
    </div>
  );
};

export default Login;
