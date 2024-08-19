import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import SlideDiscount from "./SlideDiscount";
import ico from '../../../assets/for title/005-special-tag.png'
import ict from '../../../assets/for title/011-shopping.png'


const DiscountProducts = () => {
    return (
        <div className="py-10">
            <SectionTitle title={'Offer on Products'} ico={ico} ict={ict}></SectionTitle>
            <SlideDiscount></SlideDiscount>
        </div>
    );
};

export default DiscountProducts;