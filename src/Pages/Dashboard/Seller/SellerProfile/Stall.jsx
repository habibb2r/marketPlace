import React, { useState, useEffect } from "react";
import useSellerStats from "../SellerHooks/useSellerStats";
import shopIcon from "../../../../icons/006-store.png";
import Loading from "../../../Shared/Loading/Loading";

const Stall = ({ stallInfo }) => {
  const [sellerStats, , loadSellerStat] = useSellerStats();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Define the purchase date in DD/MM/YYYY format
    const purchaseDateString = stallInfo.date;

    // Parse the purchase date string into a Date object
    const [day, month, year] = purchaseDateString.split("/");
    const purchaseDate = new Date(year, month - 1, day);

    // Define the stall duration in years
    const stallDurationYears = stallInfo.duration;

    // Calculate the end date of the stall duration
    const endDate = new Date(purchaseDate);
    endDate.setFullYear(endDate.getFullYear() + stallDurationYears);

    const updateCountdown = () => {
      // Get the current date and time
      const currentDate = new Date();

      // Calculate the elapsed time from the purchase date to the current date
      const elapsedMilliseconds = currentDate - purchaseDate;

      // Calculate the total duration in milliseconds
      const totalDurationMilliseconds = stallDurationYears * 365.25 * 24 * 60 * 60 * 1000;

      // Calculate the remaining time
      const remainingMilliseconds = totalDurationMilliseconds - elapsedMilliseconds;

      // Convert the remaining time to days, hours, minutes, and seconds
      const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
      const remainingMinutes = Math.floor(remainingSeconds / 60);
      const remainingHours = Math.floor(remainingMinutes / 60);
      const remainingDays = Math.floor(remainingHours / 24);

      const secondsLeft = remainingSeconds % 60;
      const minutesLeft = remainingMinutes % 60;
      const hoursLeft = remainingHours % 24;
      const daysLeft = remainingDays;

      setTimeLeft({ days: daysLeft, hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft });
    };

    // Update the countdown immediately
    updateCountdown();

    // Set up the interval to update every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [stallInfo]);

  if (loadSellerStat) {
    return <Loading />;
  }

  console.log(`Time left until the end of the stall duration:`);
  console.log(`Days: ${timeLeft.days}`);
  console.log(`Hours: ${timeLeft.hours}`);
  console.log(`Minutes: ${timeLeft.minutes}`);
  console.log(`Seconds: ${timeLeft.seconds}`);

  return (
    <div>
      <div className="bg-secondary bg-opacity-10 px-3 py-5 rounded-lg shadow-inner shadow-success ">
        <div className="flex items-center gap-2 py-3">
          <img className="h-[40px]" src={shopIcon} alt="" />
          <p className="text-xl font-semibold ">Stall Information</p>
        </div>
        <div className="font-sans py-3 bg-secondary bg-opacity-15 px-2 shadow-inner shadow-success rounded-xl">
          <p>
            Name:{" "}
            <span className="text-xl font-semibold">{stallInfo.stall_name}</span>
          </p>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 py-3">
            <p>
              Type: <span className="font-semibold">{stallInfo.stall_type}</span>
            </p>
            <p>
              Category: <span className="font-semibold">{stallInfo.stall_quality}</span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <p>
              Stall ID: <span className="font-semibold">{stallInfo.stall_id}</span>
            </p>
            <p>
              Purchase Date: <span className="font-semibold">{stallInfo.date}</span>
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

        <div className="grid grid-cols-2 gap-3 px-3 py-4">
          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">
              Total Items{" "}
              <span className="px-3 font-semibold text-primary">
                Max: {stallInfo.shop_size}
              </span>
            </div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalProducts}
            </div>
            <div className="stat-desc">Have in this Stall</div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">
              Total Categories{" "}
              <span className="px-3 font-semibold text-primary">
                Max: {stallInfo.max_category}
              </span>
            </div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalCategories}
            </div>
            <div className="stat-desc">Have in this Stall</div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Sales</div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalSales}
            </div>
            <div className="stat-desc">More to go</div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Revenue</div>
            <div className="text-secondary text-xl font-extrabold">
              {sellerStats?.totalRevenue} tk
            </div>
            <div className="stat-desc">Fair Enough</div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Delivered</div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalDeliverd}
            </div>
            <div className="stat-desc">Great</div>
          </div>

          <div className="stat shadow rounded-lg shadow-secondary transition-transform duration-300 ease-in-out hover:scale-105 bg-success bg-opacity-15">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Total Pendings</div>
            <div className="stat-value text-secondary">
              {sellerStats?.totalPending}
            </div>
            <div className="stat-desc">Deliver as soon as possible</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stall;
