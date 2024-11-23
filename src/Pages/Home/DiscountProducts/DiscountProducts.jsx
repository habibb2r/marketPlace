import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import SlideDiscount from "./SlideDiscount";
import ico from '../../../assets/for title/005-special-tag.png'
import ict from '../../../assets/for title/011-shopping.png'
import {motion} from 'framer-motion'


const DiscountProducts = () => {
    return (
        <div className="py-10 pb-20">
            <SectionTitle title={'Offer on Products'} ico={ico} ict={ict}></SectionTitle>
            <motion.div initial={{opacity: 0, scale: 0.8}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.9, ease: 'easeInOut'}}>
            <SlideDiscount></SlideDiscount>
            </motion.div>
           
        </div>
    );
};

export default DiscountProducts;