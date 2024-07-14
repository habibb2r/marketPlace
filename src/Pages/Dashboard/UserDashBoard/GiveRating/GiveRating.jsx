import { Rating, ThinStar } from '@smastrom/react-rating'
import { useState } from 'react';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import useGetUserInfo from '../UserHooks/useGetUserInfo';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#ffe40d',
    inactiveFillColor: '#D19C00'
  }
  
const GiveRating = () => {
    const axiosSecure = useAxiosSecure()
    const [userInfo] = useGetUserInfo()
    const [rating, setRating] = useState(3)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data =>{
        const reviewData = {
            review: data.review,
            email: data.email,
            userImg: userInfo.picture? userInfo.picture : 'https://i.ibb.co/7vcgsfr/profile.png',
            name: userInfo.name,
            rate: rating
        }
        axiosSecure.post('/giveReview', reviewData)
        .then(res=>{
            if(res.data){
                Swal.fire({
                    position: "Center",
                    icon: "success",
                    title: "Thanks for your feedback",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset();
            }
        })
    };


    return (
        <div>
            <SectionTitle title='Give a review'></SectionTitle>
                
                <div className='flex flex-col justify-center items-center gap-5 pt-5'>
                
                <form className='flex flex-col justify-center items-center gap-5' onSubmit={handleSubmit(onSubmit)}>
                <Rating isRequired  style={{ maxWidth: 350 }} value={rating} onChange={setRating} itemStyles={myStyles} />
      <textarea className="textarea textarea-bordered textarea-lg w-[350px] h-[200px]  textarea-primary" placeholder="Share your valuable review" {...register("review", {})} />
      <input  className="input input-bordered input-primary w-full" type="email" placeholder="email" value={userInfo?.email} {...register("email", {})} />

      <input className='btn btn-primary' type="submit" />
    </form>
                </div>
        </div>
      
    )
};

export default GiveRating;