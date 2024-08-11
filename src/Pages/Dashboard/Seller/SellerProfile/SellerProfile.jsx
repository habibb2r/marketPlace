import { Link } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useSellerInfo from "../SellerHooks/useSellerInfo";

const SellerProfile = () => {
  const [sellerInfo, , isLoading] = useSellerInfo();
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(sellerInfo);
  return (
    <div>
      <SectionTitle title="Seller Profile"></SectionTitle>
      <div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-gray-500 bg-opacity-15 rounded-md px-4 py-5">
            <div className="flex justify-start items-center gap-4">
              <img
                className="rounded-md h-[100px] w-[100px] md:h-[150px] md:w-[150px] shadow-sm"
                src={sellerInfo.sellerBio?.picture}
                alt=""
              />
              <div className="flex flex-col justify-center items-center gap-3 font-semibold font-mono">
                <div>
                  <h2>Name : {sellerInfo.sellerBio?.name}</h2>
                  <h2>Email : {sellerInfo.sellerBio?.email}</h2>
                  <h2>
                    Phone :{" "}
                    {sellerInfo.sellerBio?.phone
                      ? sellerInfo.sellerBio.phone
                      : <span className="text-error">Update Profile</span>}
                  </h2>
                </div>
                <Link
                  className="btn btn-secondary"
                  to="/sellerdashboard/userupdate"
                >
                  {" "}
                  Update Profile
                </Link>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold border-b-2 border-secondary py-2">Addtional Information</h1>
              <div className="flex flex-col justify-start items-start font-mono">
                <p><span className="font-semibold">Birth</span> : {sellerInfo.sellerBio?.dob}</p>
                <p><span className="font-semibold">Gender</span> : {sellerInfo.sellerBio?.gender}</p>
                <p><span className="font-semibold">Role</span> : {sellerInfo.sellerBio?.role}</p>
                <div className="flex justify-center items-start gap-2">
                  <p><span className="font-semibold">Account Created</span> :</p>
                  <div>
                    <p><span className="font-semibold">Date</span>: {sellerInfo.sellerBio?.createdDate}</p>
                    <p><span className="font-semibold">Time</span> : {sellerInfo.sellerBio?.createdTime}</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div>
            <div className="bg-primary bg-opacity-10 px-3 py-5 rounded-md">
              <p className="text-xl font-semibold border-b-2 border-success py-3">Stall Information</p>
              <div className="font-mono py-3">
                <p className="md:text-center">Stall Name : <span className="text-xl font-semibold">{sellerInfo.sellerProfile?.stall_name}</span></p>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 py-3">
                <p className="">Stall Type :<span className="">{sellerInfo.sellerProfile?.stall_type}</span></p>
                <p>Stall Category :<span className="">{sellerInfo.sellerProfile?.stall_quality}</span></p>
                
                </div>
                <div className="flex justify-between items-center gap-4">
                <p>Stall ID : <span className="">{sellerInfo.sellerProfile?.stall_id}</span></p>
                <p>Purchase Date : <span className="">{sellerInfo.sellerProfile?.date}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
