import userName from "../../../../assets/seller/001-agent.png";
import userBirth from "../../../../assets/seller/005-pediatrics.png";
import userEmail from "../../../../assets/seller/002-gmail.png";
import userPhone from "../../../../assets/seller/003-add-contact.png";
import userUpdate from "../../../../assets/seller/004-updated.png";
import userGender from "../../../../assets/seller/006-equality.png";
import userDate from "../../../../assets/seller/008-calendar.png";
import userRole from "../../../../assets/seller/007-management.png";
import userTime from "../../../../assets/seller/009-clock.png";
import { Link } from 'react-router-dom';

const Seller = ({seller, mystate}) => {
    return (
        <div className="bg-gray-500 bg-opacity-15 rounded-md px-4 py-5 shadow-md shadow-blue-400">
            <div className="flex flex-col md:flex-row justify-start items-center gap-4">
              <img
                className="rounded-2xl h-[120px] w-[120px] md:h-[150px] md:w-[150px] shadow-lg shadow-primary"
                src={seller?.picture}
                alt=""
              />
              <div className="flex flex-col  md:justify-center items-start md:items-center  gap-3 font-semibold font-sans">
                <div className="flex flex-col justify-start items-start gap-4">
                  <div className="flex items-center gap-2">
                    <img className="h-[20px]" src={userName} alt="" />
                    <h2 className="text-xl">{seller?.name}</h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <img className="h-[15px]" src={userEmail} alt="" />
                    <h2 className="text-md">{seller?.email}</h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <img className="h-[20px]" src={userPhone} alt="" />
                    <h2 className="text-md">
                      {seller?.phone ? (
                        seller.phone
                      ) : (
                        <span className="text-error">Update Profile</span>
                      )}
                    </h2>
                  </div>

                  <Link
                    className=""
                    to="/sellerdashboard/userupdate"
                    state={mystate}
                  >
                    <div className="flex items-center gap-1">
                      <img className="h-[50px]" src={userUpdate} alt="" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold border-b-2 border-secondary py-2">
                Addtional Information
              </h1>
              <div className="flex flex-col md:flex-row justify-between items-start font-sans gap-4 py-3">
                <div className="flex items-center gap-2">
                  <img className="h-[40px]" src={userBirth} alt="" />
                  <span className="font-semibold">
                    {seller?.dob}
                  </span>{" "}
                </div>
                <p className="flex items-center gap-2">
                  <img className="h-[40px]" src={userGender} alt="" />
                  <span className="font-semibold">
                    {seller?.gender}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <img className="h-[40px]" src={userRole} alt="" />{" "}
                  <span className="font-semibold">
                    {seller?.role}
                  </span>
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-start items-start gap-3 py-3">
                <p className="border-b-2 border-secondary">
                  <span className="font-semibold">Account Created</span> :
                </p>
                <div className="flex items-center justify-around gap-4">
                  <p className="flex items-center gap-2">
                    {" "}
                    <img className="h-[40px]" src={userDate} alt="" />
                    <span className="font-semibold">
                      {seller?.createdDate}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    {" "}
                    <img className="h-[40px]" src={userTime} alt="" />
                    <span className="font-semibold">
                      {seller?.createdTime}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
    );
};

export default Seller;