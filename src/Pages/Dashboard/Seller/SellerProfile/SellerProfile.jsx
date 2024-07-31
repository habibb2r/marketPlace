import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useSellerInfo from "../SellerHooks/useSellerInfo";

const SellerProfile = () => {
    const[sellerInfo] = useSellerInfo()
    console.log(sellerInfo)
  return (
    <div>
      <SectionTitle title="Seller Profile"></SectionTitle>
      <div>
        <div className="grid grid-cols-2 gap-10">
          <div>Seller Information</div>
          <div>Seller Statictics </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
