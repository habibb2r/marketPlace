import { useParams } from "react-router-dom";
import useShopDetails from "../../Hooks/useShopDetails";
import Loading from "../Shared/Loading/Loading";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import Cards from "../AllProducts/Cards";


const ShopDetails = () => {
    const id = useParams()
    const [shopDetails, isLoading] = useShopDetails(id);
    if (isLoading) {
        <Loading></Loading>
    }
  
    return (
        <div>
            <SectionTitle title='Shop Detials'></SectionTitle>
            <div className="px-3 py-5">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <p className="text-xl  font-extralight"><span className="font-mono font-bold">Stall Name : </span> {shopDetails[0]? shopDetails[0].stall_name : 'Loading..'}</p>
                <p className="text-xl  font-extralight"><span className="font-mono font-bold">Stall Type :</span> {shopDetails[0]? shopDetails[0].stall_type: 'Loading..'}</p>
                <p className="text-xl  font-extralight"><span className="font-mono font-bold">Total Products :</span> {shopDetails.length? shopDetails.length : 'Loading...'}</p>
            </div>
            <div className="text-center">
                <p className="text-xl font-medium font-sans py-5 text-primary">Products available in this stall</p>
                <div className="grid md:grid-cols-4 gap-5">
                    {
                        shopDetails.map(item=> <Cards key={item._id} data={item}></Cards>)
                    }
                </div>
            </div>
            </div>
        </div>
    );
};

export default ShopDetails;