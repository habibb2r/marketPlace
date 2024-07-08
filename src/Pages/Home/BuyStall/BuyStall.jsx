import useBuyShop from "../../../Hooks/useBuyShop";
import Loading from "../../Shared/Loading/Loading";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import SellerCard from "./SellerCard";


const BuyStall = () => {
    const [buyShop, isLoading] = useBuyShop()
    console.log(buyShop)

    if (isLoading) {
        <Loading></Loading>
    }
    return (
        <div className="py-10">
            <SectionTitle title='Want to be a Seller?'></SectionTitle>
            <div className="grid grid-cols-3 gap-3 pt-10">
                {
                    buyShop.map(shop => <SellerCard key={shop._id} data ={shop}></SellerCard>)
                }
            </div>
        </div>
    );
};

export default BuyStall;