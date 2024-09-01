import useBuyShop from "../../../Hooks/useBuyShop";
import Loading from "../../Shared/Loading/Loading";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import SellerCard from "./SellerCard";
import ico from '../../../assets/for title/006-businessman.png'
import ict from '../../../assets/for title/007-best-seller.png'


const BuyStall = () => {
    const [buyShop, isLoading] = useBuyShop()

    if (isLoading) {
        <Loading></Loading>
    }
    return (
        <div className="py-10">
            <SectionTitle title='Join as Seller?' ico={ico} ict={ict}></SectionTitle>
            <div className="grid md:grid-cols-3 gap-3 pt-10">
                {
                    buyShop.map(shop => <SellerCard key={shop._id} data ={shop}></SellerCard>)
                }
            </div>
        </div>
    );
};

export default BuyStall;