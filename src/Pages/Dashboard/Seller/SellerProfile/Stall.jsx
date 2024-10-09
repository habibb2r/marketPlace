import { useState, useEffect } from "react";
import useSellerStats from "../SellerHooks/useSellerStats";
import shopIcon from "../../../../icons/006-store.png";
import Loading from "../../../Shared/Loading/Loading";
import { Rating } from "@smastrom/react-rating";

const Stall = ({ stallInfo }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const purchaseDateString = stallInfo.date;

    const [day, month, year] = purchaseDateString.split("/");
    const purchaseDate = new Date(year, month - 1, day);

    const stallDurationYears = stallInfo.duration;
    const endDate = new Date(purchaseDate);
    endDate.setFullYear(endDate.getFullYear() + stallDurationYears);

    const updateCountdown = () => {
      const currentDate = new Date();

      const elapsedMilliseconds = currentDate - purchaseDate;

      const totalDurationMilliseconds =
        stallDurationYears * 365.25 * 24 * 60 * 60 * 1000;

      const remainingMilliseconds =
        totalDurationMilliseconds - elapsedMilliseconds;

      const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
      const remainingMinutes = Math.floor(remainingSeconds / 60);
      const remainingHours = Math.floor(remainingMinutes / 60);
      const remainingDays = Math.floor(remainingHours / 24);

      const secondsLeft = remainingSeconds % 60;
      const minutesLeft = remainingMinutes % 60;
      const hoursLeft = remainingHours % 24;
      const daysLeft = remainingDays;

      setTimeLeft({
        days: daysLeft,
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft,
      });
    };

    updateCountdown();

    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [stallInfo]);

  return (
    <div>
      <div className="bg-secondary bg-opacity-10 px-3 py-5 rounded-lg shadow-inner shadow-success ">
        <div className="flex items-center gap-2 py-3">
          <img className="h-[40px]" src={shopIcon} alt="" />
          <p className="text-xl font-semibold ">Stall Information</p>
        </div>

        <div className="font-sans py-3 bg-secondary bg-opacity-15 px-2 shadow-inner shadow-success rounded-xl">
          <div className="w-full flex justify-center mx-auto py-2">
            <Rating
              className="text-center"
              style={{ maxWidth: 150 }}
              value={stallInfo.rated}
              readOnly
            />
          </div>
          <p>
            <span className="text-2xl font-semibold">
              {stallInfo.stall_name}
            </span>
          </p>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 py-3">
            <p>
              <span className="font-semibold">{stallInfo.stall_type}</span>
            </p>
            <p>
              Category:{" "}
              <span className="font-semibold">{stallInfo.stall_quality}</span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <p>
              Stall ID:{" "}
              <span className="font-semibold">{stallInfo.stall_id}</span>
            </p>
            <p>
              Purchase Date:{" "}
              <span className="font-semibold">{stallInfo.date}</span>
            </p>
          </div>

          <div className="flex gap-3 font-semibold py-2 bg-accent bg-opacity-30 px-2">
            <p>Expires in :</p>
            <div>
              <span className="font-mono text-sm">
                <span className="font-bold">{timeLeft.days}</span>
              </span>
              days
            </div>
            <div>
              <span className="countdown font-mono sm">
                <span style={{ "--value": timeLeft.hours }}></span>
              </span>
              hours
            </div>
            <div>
              <span className="countdown font-mono sm">
                <span style={{ "--value": timeLeft.minutes }}></span>
              </span>
              min
            </div>
            <div>
              <span className="countdown font-mono sm">
                <span style={{ "--value": timeLeft.seconds }}> </span>
              </span>
              sec
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stall;
