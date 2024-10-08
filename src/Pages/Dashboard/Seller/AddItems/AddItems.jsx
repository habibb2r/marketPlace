import { useForm } from "react-hook-form";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

import Loading from "../../../Shared/Loading/Loading";

import useFeatureList from "../SellerHooks/useFeatureList";
import Swal from "sweetalert2";
import useSellerInfo from "../SellerHooks/useSellerInfo";

const img_hosting = import.meta.env.VITE_img_host;
const img_upload_preset = import.meta.env.VITE_preset;
const img_cloud_name = import.meta.env.VITE_cloud;
import ico from "../../../../assets/for title/025-playlist.png";
import ict from "../../../../assets/for title/026-shopping-bag.png";
import { useLocation } from "react-router-dom";

const AddItems = () => {
  const location = useLocation();
  const category = location?.state?.category;
  
  const hosting_url = img_hosting;


  const [sellerInfo] = useSellerInfo();
  const [featureList, , isLoading] = useFeatureList(category);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  

  if(isLoading){
    return <Loading/>
  }
  const onSubmit = async (data) => {
    // console.log(data);
    console.log(errors)
    const features = {};
    featureList?.data?.forEach((feature) => {
      if (data[feature]) {
        features[feature] = data[feature];
      }
    });

    const imgdata = new FormData();
    const image = data.image[0];
    imgdata.append("file", image);
    imgdata.append("upload_preset", img_upload_preset);
    imgdata.append("cloud_name", img_cloud_name);

    try {
      if (image === null) {
        return alert("Please Upload image");
      }

      const res = await fetch(hosting_url, {
        method: "POST",
        body: imgdata,
      });

      const cloudData = await res.json();
      // console.log(cloudData);
      const imgURL = cloudData.url;
      if (imgURL) {
        const additemdata = {
          product_name: data.product_name,
          product_image: imgURL,
          product_category: category,
          product_rating: 0,
          total_rated: 0,
          quantity: data.quantity,
          product_price: {
            previous_price: data.previous_price,
            present_price: data.present_price,
            discount: data.discount,
          },
          product_description: {
            description: data.description,
            features: features,
          },
          stall: {
            name: sellerInfo.sellerProfile.stall_name,
            id: sellerInfo.sellerProfile.stall_id,
            type: sellerInfo.sellerProfile.stall_type,
          },
        };

        axiosSecure.post("/addItems", additemdata).then((res) => {
          if (res.data) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added Items Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `{error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }

  };

  return (
    <div>
      <SectionTitle title="Add Items" ico={ico} ict={ict}></SectionTitle>
      <div className="flex flex-col justify-center items-center gap-5 py-5 pb-10 bg-accent bg-opacity-10 rounded-lg">
      <div className="badge badge-warning gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="inline-block h-4 w-4 stroke-current">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"></path>
  </svg>
  {category}
</div>
        <form
          className="flex flex-col justify-center items-center gap-3 shadow-md shadow-primary bg-accent bg-opacity-20 px-5 py-5 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">* Product Name</span>
            </div>
            <input
              className="input input-bordered input-primary md:w-full "
              type="text"
              placeholder="product_name"
              {...register("product_name", { required: true })}
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">* Product Description</span>
            </div>
            <textarea placeholder="Enter Product Description here"
              className="textarea textarea-bordered textarea-lg w-[300px] md:w-full h-[150px]  textarea-primary"
              {...register("description", { required: true })}
            />
          </label>
          <div className="grid md:grid-cols-2 gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">* Product Image</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              {...register("image")}
            />
          </label>

          <label className="form-control md:w-full">
              <div className="label">
                <span className="label-text">* Quantity</span>
              </div>
              <input
                className="input input-bordered input-primary md:w-[100px] max-w-xs"
                type="number"
                placeholder="Quantity"
                {...register("quantity",{required: true, max: 30, min: 0})}
              />
            </label>
          </div>
          <div className="grid md:grid-cols-3 gap-2">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">* Present Price</span>
              </div>
              <input
                className="input input-bordered input-primary w-full max-w-xs"
                type="number"
                placeholder="present_price"
                {...register("present_price", { required: true })}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">* Previous Price</span>
              </div>
              <input
                className="input input-bordered input-primary w-full max-w-xs"
                type="number"
                placeholder="previous_price"
                {...register("previous_price", { required: true })}
              />
            </label>

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">* Select Discount</span>
              </div>
              <select
                className="input input-bordered input-primary w-full max-w-xs"
                {...register("discount", {
                  setValueAs: (value) =>
                    value === "true" ? true : value === "false" ? false : "",
                })}
              >
                <option value={""}>Discount?</option>
                <option value={"true"}>Yes</option>
                <option value={"false"}>No</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 py-2">
            <p className="font-mono font-semibold">* Product Features</p>
            <div className="grid md:grid-cols-2 gap-2">
              {featureList?.data?.map((feature) => (
                <label key={feature} className="form-control w-full ">
                  <div className="label">
                    <span className="label-text uppercase">* {feature}</span>
                  </div>
                  <input
                    className="input input-bordered input-primary w-full max-w-xs"
                    type="text"
                    placeholder={`${feature}`}
                    {...register(`${feature}`, { required: true })}
                  />
                </label>
              ))}
            </div>
          </div>

          <input className="btn btn-success" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddItems;
