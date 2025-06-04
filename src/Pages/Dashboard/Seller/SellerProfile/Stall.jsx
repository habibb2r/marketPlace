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
    const updateCountdown = () => {
      const purchaseDateString = stallInfo.date;
      const [day, month, year] = purchaseDateString.split("/");
      const purchaseDate = new Date(year, month - 1, day);
      const stallDurationYears = stallInfo.duration;
      const endDate = new Date(purchaseDate);
      endDate.setFullYear(endDate.getFullYear() + stallDurationYears);
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
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="p-6">
        {/* Stall Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <img className="h-8 w-8" src={shopIcon} alt="Shop" />
            </div>
            <h2 className="text-xl font-semibold">Stall Information</h2>
          </div>
          <Rating
            style={{ maxWidth: 120 }}
            value={stallInfo.rated}
            readOnly
            className="hidden md:block"
          />
        </div>

        {/* Stall Content */}
        <div className="space-y-6">
          {/* Stall Name and Rating (Mobile) */}
          <div className="md:hidden">
            <Rating
              style={{ maxWidth: 120 }}
              value={stallInfo.rated}
              readOnly
              className="mb-3"
            />
          </div>
          <h1 className="text-2xl font-bold text-primary">
            {stallInfo.stall_name}
          </h1>

          {/* Stall Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Stall Type</p>
              <p className="font-semibold mt-1">{stallInfo.stall_type}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold mt-1">{stallInfo.stall_quality}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Stall ID</p>
              <p className="font-semibold mt-1">{stallInfo.stall_id}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Purchase Date</p>
              <p className="font-semibold mt-1">{stallInfo.date}</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mt-6">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                Subscription Expires In
              </h3>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-white rounded-lg p-3 text-center">
                  <span className="text-2xl font-bold text-primary">
                    {timeLeft.days}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Days</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <span className="text-2xl font-bold text-primary">
                    {timeLeft.hours}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Hours</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <span className="text-2xl font-bold text-primary">
                    {timeLeft.minutes}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Minutes</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <span className="text-2xl font-bold text-primary">
                    {timeLeft.seconds}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stall;
