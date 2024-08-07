import { useForm } from "react-hook-form";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Shared/Loading/Loading";

const AddItems = () => {
  const axiosSecure = useAxiosSecure();
  const [cate, setCate] = useState('Mobile');
  const [info, setInfo] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  axiosSecure.get(`/categories?category=${cate}`)
  .then(res=>{
    setInfo(res.data)
  })
      
     
  const handleFilter = (e) => {
    console.log(e.target.value)
    setCate(e.target.value);
    
  };


  console.log(info)

  
  return (
    <div>
      <SectionTitle title="Add Items"></SectionTitle>
      <select
            defaultValue={"All"}
            onClick={handleFilter}
            className="select select-primary select-bordered w-full max-w-xs"
          >
            <option value={"All"}>Select Type</option>
            {info?.types.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          type="text"
          placeholder="product_name"
          {...register("product_name", {})}
        />
        <textarea
          className="textarea textarea-bordered textarea-lg w-[350px] h-[150px]  textarea-primary"
          {...register("description", {})}
        />
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          type="number"
          placeholder="present_price"
          {...register("present_price", {})}
        />
        <input
          className="input input-bordered input-primary w-full max-w-xs"
          type="number"
          placeholder="previous_price"
          {...register("previous_price", {})}
        />
        <select
          className="input input-bordered input-primary w-full max-w-xs"
          {...register("discount")}
        >
          <option value="yes">yes</option>
          <option value=" no"> no</option>
        </select>

        <div>
          {info?.data.map((feature) => (
            <input
              key={feature}
              className="input input-bordered input-primary w-full max-w-xs"
              type="text"
              placeholder={`${feature}`}
              {...register(`${feature}`)}
            />
          ))}
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default AddItems;
