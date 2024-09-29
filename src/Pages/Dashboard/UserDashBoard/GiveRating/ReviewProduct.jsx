import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useOrderStatus from "../UserHooks/useOrderStatus";
import ico from "../../../../assets/basic/003-review.png";
import ict from "../../../../assets/basic/004-rate.png";

const ReviewProduct = () => {
    const [orderStatus, orderLoad] = useOrderStatus();
    const filteredArray = orderStatus?.filter(item => item.delivered === true);
    console.log(filteredArray)
    return (
        <div>
            <SectionTitle ico={ico} ict={ict} title="Product Review"></SectionTitle>
            
        </div>
    );
};

export default ReviewProduct;