import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import ico from "../../../../assets/seller/004-updated.png";
import ict from "../../../../assets/seller/updateico.png";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
// const img_hosting_token = import.meta.env.VITE_imgbb_token;
const img_hosting = import.meta.env.VITE_img_host;
const img_upload_preset = import.meta.env.VITE_preset;
const img_cloud_name = import.meta.env.VITE_cloud;

const UpdateItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemDetails = location?.state?.item;
  const axiosSecure = useAxiosSecure();
  const from = "/sellerdashboard/manageitems";
  const hosting_url = img_hosting;

  // const hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  if (!itemDetails) {
    return <Loading></Loading>;
  }

  console.log(location);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data)
    // Separate out features from the other form data
    const features = {};
    const otherData = {};

    Object.keys(data).forEach((key) => {
      if (itemDetails.product_description.features.hasOwnProperty(key)) {
        features[key] = data[key];
      } else {
        otherData[key] = data[key];
      }
    });

    if (data?.image.length == 0) {
      const updateData = {
        product_name: data.product_name,
        product_price: {
          previous_price: data.previous_price,
          present_price: data.present_price,
          discount: data.discount,
        },
        product_description: {
          description: data.description,
          features: features,
        },
      };
      let timerInterval;
      Swal.fire({
        title: "Updating item in market place.!",
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
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
      axiosSecure
        .patch(`/updateitem/${itemDetails._id}`, updateData)
        .then((res) => {
          if (res.data) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Added Items Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
            //
          }
        });
    } else {
      const imgdata = new FormData();
      const image = data.image[0];
      imgdata.append("file", image);
      imgdata.append("upload_preset", img_upload_preset);
      imgdata.append("cloud_name", img_cloud_name);

      try {
        if (image === null) {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please insert image correctly!",
          });
        }

        const res = await fetch(hosting_url, {
          method: "POST",
          body: imgdata,
        });

        const cloudData = await res.json();
        // console.log(cloudData);
        const imgURL = cloudData.url;

        if (imgURL) {
          const updateData = {
            product_name: data.product_name,
            product_image: imgURL,
            product_price: {
              previous_price: data.previous_price,
              present_price: data.present_price,
              discount: data.discount,
            },
            product_description: {
              description: data.description,
              features: features,
            },
          };
          axiosSecure
            .patch(`/updateitem/${itemDetails._id}`, updateData)
            .then((res) => {
              if (res.data) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Added Items Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(from, { replace: true });
              }
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `{error.message}`,
        });
      }

      //start
      // const formData = new FormData();
      // formData.append("image", data.image[0]);
      // fetch(hosting_url, {
      //   method: "POST",
      //   body: formData,
      // })
      //   .then((res) => res.json())
      //   .then((imageResponse) => {
      //     if (imageResponse.success) {
      //       let timerInterval;
      //       Swal.fire({
      //         title: "Updating item in market place.!",
      //         html: "I will close in <b></b> milliseconds.",
      //         timer: 2000,
      //         timerProgressBar: true,
      //         didOpen: () => {
      //           Swal.showLoading();
      //           const timer = Swal.getPopup().querySelector("b");
      //           timerInterval = setInterval(() => {
      //             timer.textContent = `${Swal.getTimerLeft()}`;
      //           }, 100);
      //         },
      //         willClose: () => {
      //           clearInterval(timerInterval);
      //         },
      //       }).then((result) => {
      //         /* Read more about handling dismissals below */
      //         if (result.dismiss === Swal.DismissReason.timer) {
      //           console.log("I was closed by the timer");
      //         }
      //       });

      //       const imgURL = imageResponse.data.display_url;

      //       const updateData = {
      //         product_name: data.product_name,
      //         product_image: imgURL,
      //         product_price: {
      //           previous_price: data.previous_price,
      //           present_price: data.present_price,
      //           discount: data.discount,
      //         },
      //         product_description: {
      //           description: data.description,
      //           features: features,
      //         },
      //       };

      //       axiosSecure
      //         .patch(`/updateitem/${itemDetails._id}`, updateData)
      //         .then((res) => {
      //           if (res.data) {
      //             reset();
      //             Swal.fire({
      //               position: "top-end",
      //               icon: "success",
      //               title: "Added Items Successfully",
      //               showConfirmButton: false,
      //               timer: 1500,
      //             });
      //             navigate(from, { replace: true });
      //           }
      //         });
      //     }
      //   });

      //end
    }

    //end
  };

  return (
    <div>
      <SectionTitle title={"Update Item"} ico={ico} ict={ict}></SectionTitle>
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
            defaultValue={itemDetails?.product_name}
            placeholder="product_name"
            {...register("product_name", { required: true })}
          ></input>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">* Product Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered textarea-lg w-[300px] md:w-full h-[150px] textarea-primary"
            {...register("description", { required: true })}
          >
            {itemDetails?.product_description?.description}
          </textarea>
        </label>
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
        <div className="grid md:grid-cols-3 gap-2">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">* Present Price</span>
            </div>
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="number"
              defaultValue={itemDetails?.product_price?.present_price}
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
              defaultValue={itemDetails?.product_price?.previous_price}
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
            {Object.entries(itemDetails?.product_description?.features).map(
              ([feature, value]) => (
                <label key={feature} className="form-control w-full ">
                  <div className="label">
                    <span className="label-text uppercase">
                      * {feature.charAt(0).toUpperCase() + feature.slice(1)}
                    </span>
                  </div>
                  <input
                    className="input input-bordered input-primary w-full max-w-xs"
                    type="text"
                    defaultValue={value}
                    placeholder={`feature`}
                    {...register(`${feature}`, { required: true })}
                  />
                </label>
              )
            )}
          </div>
        </div>

        <input className="btn btn-success" type="submit" />
      </form>
    </div>
  );
};

export default UpdateItem;
