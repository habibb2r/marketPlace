import { useForm } from "react-hook-form";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Shared/Loading/Loading";
import useAddCategories from "../SellerHooks/useAddCategories";
import useFeatureList from "../SellerHooks/useFeatureList";
import Swal from "sweetalert2";
import useSellerInfo from "../SellerHooks/useSellerInfo";
const img_hosting_token = import.meta.env.VITE_imgbb_token;

const AddItems = () => {
  const hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const [sellerInfo] = useSellerInfo();
  const [select, setSelect] = useState();
  const [cateList, ,] = useAddCategories();
  const [featureList, refetch, isLoading] = useFeatureList(select);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const features = {};
    featureList?.data?.forEach((feature) => {
      if (data[feature]) {
        features[feature] = data[feature];
      }
    });

    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        if (imageResponse.success) {
          let timerInterval;
          Swal.fire({
            title: "Adding item to market place.!",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });


          const imgURL = imageResponse.data.display_url;
          const features = {};
          featureList?.data?.forEach((feature) => {
            if (data[feature]) {
              features[feature] = data[feature];
            }
          });
          const additemdata = {
            product_name: data.product_name,
            product_image: imgURL,
            product_category: select,
            product_rating: 0,
            total_rated : 0,
            product_price: {
              previous_price: data.previous_price,
              present_price: data.present_price,
              discount: data.discount
            },
            product_description: {
              description: data.description,
              features: features,
            },
            stall: {
              name: sellerInfo.sellerProfile.stall_name,
              id: sellerInfo.sellerProfile.stall_id,
              type: sellerInfo.sellerProfile.stall_type
            }
          };
          console.log(additemdata)
          axiosSecure.post('/addItems',additemdata)
          .then(res=>{
              if(res.data){
                reset()
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Added Items Successfully",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
          })
        }
      });
  };

  const handleFilter = (e) => {
    console.log(e.target.value);
    setSelect(e.target.value);
  };
  const handleNext = () => {
    refetch();
  };

  // console.log("CateList", cateList);
  // console.log(featureList);
  // console.log('Seller',sellerInfo);

  return (
    <div>
      <SectionTitle title="Add Items"></SectionTitle>
      <div className="flex flex-col justify-center items-center gap-5 py-5">
        <p className="text-error font-semibold">Instruction : At first select a type then must click on Next Button</p>
        <div className="flex justify-center items-center gap-2">
          <select
            defaultValue={""}
            onClick={handleFilter}
            className="select select-primary select-bordered w-full max-w-xs"
          >
            <option value={""}>Select Type</option>
            {cateList?.products_types_list?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={handleNext}
            disabled={!select}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
        <form
          className="flex flex-col justify-center items-center gap-3 border-primary border-2 px-5 py-5 rounded-md"
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
              {...register("product_name", {})}
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">* Product Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered textarea-lg w-[300px] md:w-full h-[150px]  textarea-primary"
              {...register("description", {})}
            />
          </label>

          <div className="grid md:grid-cols-3 gap-2">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">* Present Price</span>
              </div>
              <input
                className="input input-bordered input-primary w-full max-w-xs"
                type="number"
                placeholder="present_price"
                {...register("present_price", {})}
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
                {...register("previous_price", {})}
              />
            </label>

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">* Select Discount</span>
              </div>
              <select
                className="input input-bordered input-primary w-full max-w-xs"
                {...register("discount")}
              >
                <option value={""}>Discount?</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 py-2">
            <p className="font-mono font-semibold">Product Features</p>
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
                    {...register(`${feature}`)}
                  />
                </label>
              ))}
            </div>
          </div>

          <label className="form-control pb-4">
            <div className="label">
              <span className="label-text">* Product Image</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              {...register("image")}
            />
          </label>

          <input className="btn btn-success" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddItems;
