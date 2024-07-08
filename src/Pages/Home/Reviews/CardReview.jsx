import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { TfiEmail } from "react-icons/tfi";

const CardReview = ({ data }) => {
  
  const { name, review, rate, userImg, email } = data;
  return (
    <div className="mx-3 my-10 px-10 py-10 border-2 h-[350px] shadow-sm rounded-md">
      <div className="flex gap-10 justify-center items-center">
        <div className="flex-col justify-center items-center align-middle">
          <div>
            <img
              className="h-[150px] rounded-full w-[150px]"
              src={userImg}
              alt=""
            />
          </div>
          <h1 className="font-semibold text-2xl pt-2">{name}</h1>
          <div className="flex justify-center items-center gap-2">
            <TfiEmail />
            <p>{email}</p>
          </div>
        </div>
        <div className="flex-col">
          <Rating style={{ maxWidth: 180 }} value={rate} readOnly />
          <p className="text-justify font-light text-xl max-w-96 py-5">
            {review}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardReview;
