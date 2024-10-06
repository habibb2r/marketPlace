import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import ico from '../../../../assets/for title/025-playlist.png'
import ict from '../../../../assets/for title/026-shopping-bag.png'
import useAddCategories from "../SellerHooks/useAddCategories";
import { Link } from "react-router-dom";

const AddItemCategory = () => {
    const [cateList, ,] = useAddCategories();
    return (
        <div>
            <SectionTitle title="Select A Category" ico={ico} ict={ict}></SectionTitle>
            
            <div className="grid grid-cols-4 gap-5">
                {
                    cateList?.products_types_list?.map(category=> <Link state={{category}} className="py-3 px-4 bg-accent bg-opacity-30 rounded-lg text-center" to='additems' key={category}>{category}</Link>)
                }
            </div>
        </div>
    );
};

export default AddItemCategory;