import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useMyReview from "../UserHooks/useMyReview";
import ico from "../../../../assets/basic/003-review.png";
import ict from "../../../../assets/basic/004-rate.png";

const MyReviews = () => {
    const [myReview, refetch, loadReview] = useMyReview()
    console.log(myReview)
    return (
        <div>
            <SectionTitle ico={ico} ict={ict} title="My Reviews"></SectionTitle>
            
        </div>
    );
};

export default MyReviews;