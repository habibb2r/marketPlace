import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import SlideDiscount from "./SlideDiscount";


const DiscountProducts = () => {
    return (
        <div className="h-[60vh] py-10">
            <SectionTitle title={'Offer on Products'}></SectionTitle>
            <SlideDiscount></SlideDiscount>
        </div>
    );
};

export default DiscountProducts;