import { useParams } from "react-router-dom";
import useShopDetails from "../../Hooks/useShopDetails";
import Loading from "../Shared/Loading/Loading";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import Cards from "../AllProducts/Cards";
import ico from '../../assets/for title/019-store-management.png'
import ict from '../../assets/for title/013-shop.png'
import './shopname.css'

const ShopDetails = () => {
    const id = useParams()
    const [shopDetails, isLoading] = useShopDetails(id);
    if (isLoading) {
        <Loading></Loading>
    }
    return (
        <div>
            <SectionTitle title='Shop Details' ico={ico}  ict={ict}></SectionTitle>
            <div className="px-2 py-5">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 bg-secondary bg-opacity-25 py-4 px-5 rounded-md shadow-inner shadow-success">
                <p className="text-xl  font-extralight bodyget"><span className="hi">{shopDetails[0]? shopDetails[0].stall.name : 'Loading..'}</span></p>
                <div className="pt-5 md:pt-0 flex flex-col justify-center items-center md:gap-4">
                <p className="text-xl  font-extralight "><span className="font-mono font-bold">Stall Type :</span> {shopDetails[0]? shopDetails[0].stall.type: 'Loading..'}</p>
                <p className="text-xl  font-extralight"><span className="font-mono font-bold">Total Products :</span> {shopDetails.length? shopDetails.length : 'Loading...'}</p>
            
                </div>
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