import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const img_hosting_token = import.meta.env.VITE_imgbb_token
const UpdateUser = () => {
  const hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_token}`
  console.log(img_hosting_token)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
      const formData = new FormData()
      formData.append('image', data.image[0])
      console.log(formData)
    };
    console.log(errors);
    return (
        <div>
            <SectionTitle title='Update User Information'></SectionTitle>
            <div className="pt-10">
            <form className="flex flex-col justify-center items-center gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-3">
      <input className="input input-bordered input-primary w-full max-w-xs" type="text" placeholder="Name" {...register("name", {})} />
      <input className="input input-bordered input-primary w-full max-w-xs" type="text" placeholder="Phone" {...register("phone", {})} />
      <input className="border-1 border-primary p-2 rounded-lg select-primary" type="datetime-local" placeholder="Date of Birth" {...register("dob", {})} />
      <select className="select select-primary w-full max-w-xs" {...register("gender")}>
        <option value="Male">Male</option>
        <option value=" Female"> Female</option>
      </select>

      <input
  type="file"
  className="file-input file-input-bordered file-input-primary w-full max-w-xs" {...register("image")} />

      </div>
      <input className="btn btn-success" type="submit" />
    </form>
            </div>
            
        </div>
    );
};

export default UpdateUser;