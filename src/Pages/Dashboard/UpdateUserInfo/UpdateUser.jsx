import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useGetUserInfo from "../UserDashBoard/UserHooks/useGetUserInfo";
import useAuth from "../../../Hooks/useAuth";

const img_hosting_token = import.meta.env.VITE_imgbb_token;

const UpdateUser = () => {
  const [, refetch] = useGetUserInfo();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let timerInterval;
    Swal.fire({
      title: "Updating Profile ",
      html: "Please wait <b></b>",
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
    const formData = new FormData();
    formData.append("image", data.image[0]);
    const dateTimeString = data.dob;
    const [date, time] = dateTimeString.split("T");

    if (data.image.length == 0) {
      const updateData = {
        name: data.name,
        gender: data.gender,
        dob: date,
        time: time,
        phone: data.phone,
      };

      axiosSecure
        .patch(`/userupdate?email=${user?.email}`, updateData)
        .then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Profile Updated",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
            refetch();
          }
          console.log(res.data);
        });
    } else {
      fetch(hosting_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageResponse) => {
          if (imageResponse.success) {
            const imgURL = imageResponse.data.display_url;
            const updateData = {
              name: data.name,
              picture: imgURL,
              gender: data.gender,
              dob: date,
              time: time,
              phone: data.phone,
            };
            axiosSecure
              .patch(`/userupdate?email=${user?.email}`, updateData)
              .then((res) => {
                if (res.data.modifiedCount) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Profile Updated",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  reset();
                  refetch();
                }
                console.log(res.data);
              });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        });
      console.log(data);
    }
  };
  console.log(errors);
  return (
    <div>
      <SectionTitle title="Update User Information"></SectionTitle>
      <div className="pt-10">
        <form
          className="flex flex-col justify-center items-center gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-2 gap-3">
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="text"
              placeholder="Name"
              {...register("name", {})}
            />
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="text"
              placeholder="Phone"
              {...register("phone", {})}
            />
            <input
              className="border-1 border-primary p-2 rounded-lg select-primary"
              type="datetime-local"
              placeholder="Date of Birth"
              {...register("dob", {})}
            />
            <select
              className="select select-primary w-full max-w-xs"
              {...register("gender")}
            >
              <option value="Male">Male</option>
              <option value=" Female"> Female</option>
            </select>

            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              {...register("image")}
            />
          </div>
          <input className="btn btn-success" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
