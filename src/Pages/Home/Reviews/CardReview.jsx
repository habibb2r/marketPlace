import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { TfiEmail } from "react-icons/tfi";
import { FaQuoteLeft } from "react-icons/fa";

const CardReview = ({ data }) => {
  const { name, review, rate, userImg, email } = data;
  return (
    <div className="bg-white w-[60%] rounded-xl shadow-lg transition-transform hover:scale-[1.02] duration-300 overflow-hidden mb-5">
      <div className="relative p-6">
        {/* Quote icon for decorative purpose */}
        <FaQuoteLeft className="absolute top-4 right-6 text-4xl text-gray-100" />

        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* User info section */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20">
                <img
                  className="w-full h-full object-cover"
                  src={userImg}
                  alt={`${name}'s profile`}
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-md">
                <Rating style={{ maxWidth: 80 }} value={rate} readOnly />
              </div>
            </div>
            <div className="text-center mt-4">
              <h3 className="font-semibold text-xl text-gray-800">{name}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                <TfiEmail className="text-primary" />
                <span>{email}</span>
              </div>
            </div>
          </div>

          {/* Review content */}
          <div className="flex-1">
            <p className="text-gray-600 leading-relaxed text-center md:text-left italic">
              &ldquo;{review}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReview;
