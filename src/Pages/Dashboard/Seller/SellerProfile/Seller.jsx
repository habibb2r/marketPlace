import userName from "../../../../assets/seller/001-agent.png";
import userBirth from "../../../../assets/seller/005-pediatrics.png";
import userEmail from "../../../../assets/seller/002-gmail.png";
import userPhone from "../../../../assets/seller/003-add-contact.png";
import userUpdate from "../../../../assets/seller/004-updated.png";
import userGender from "../../../../assets/seller/006-equality.png";
import userDate from "../../../../assets/seller/008-calendar.png";
import userRole from "../../../../assets/seller/007-management.png";
import userTime from "../../../../assets/seller/009-clock.png";
import { Link } from "react-router-dom";

const Seller = ({ seller, mystate }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="relative">
        {/* Profile Header */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="relative p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                <img
                  className="w-full h-full object-cover"
                  src={seller?.picture}
                  alt={seller?.name}
                />
              </div>
              <Link
                to="/sellerdashboard/userupdate"
                state={mystate}
                className="absolute bottom-0 right-0 bg-yellow-100 text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-200"
              >
                <img className="h-6 w-6 invert" src={userUpdate} alt="Update" />
              </Link>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <img className="h-5 w-5" src={userName} alt="" />
                  <h2 className="text-2xl font-semibold">{seller?.name}</h2>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <img className="h-4 w-4" src={userEmail} alt="" />
                  <p>{seller?.email}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <img className="h-5 w-5" src={userPhone} alt="" />
                  <p>
                    {seller?.phone || (
                      <span className="text-error font-medium">
                        Update Profile
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
          Additional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <img className="h-8 w-8" src={userBirth} alt="" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{seller?.dob}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <img className="h-8 w-8" src={userGender} alt="" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{seller?.gender}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
              <img className="h-8 w-8" src={userRole} alt="" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">{seller?.role}</p>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500">
              Account Created
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <img className="h-8 w-8" src={userDate} alt="" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{seller?.createdDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <img className="h-8 w-8" src={userTime} alt="" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{seller?.createdTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
