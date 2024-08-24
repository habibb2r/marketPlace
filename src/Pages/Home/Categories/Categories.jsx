
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useCategories from "../../../Hooks/useCategories";
import CardRow from "./CardRow";
import Loading from "../../Shared/Loading/Loading";
import cateic from '../../../assets/for title/004-menu.png'
import cateict from '../../../assets/for title/012-seo.png'
import { AttentionSeeker, Slide  } from "react-awesome-reveal";

const Categories = () => {
  const [categ, isLoading] = useCategories();

  if(isLoading){
    return <Loading></Loading>
  }

  const phones = categ.phone.slice(0,4)
  const w_fasions = categ.women_fashion.slice(0,4)
  const kids = categ.kids_fashion.slice(0,4)


  return (
    <div className="py-5">
      <SectionTitle title={"Categories"} ico={cateic} ict={cateict}></SectionTitle>
      <div className=" flex flex-col md:flex-row justify-center overflow-hidden pb-5">

        <AttentionSeeker  effect="pulse"  className="shadow-md shadow-primary w-[100%] ">
        <div className="  flex flex-col justify-between items-start gap-3 p-2 py-10">
         {
          phones.map(phone=> <CardRow key={phone._id} data={phone}></CardRow>)
         }
        </div>
        </AttentionSeeker >
        
        <AttentionSeeker  effect="pulse"   className=" shadow-xl shadow-primary w-[100%] ">
          <div className="flex flex-col justify-between items-start gap-3 p-2 py-10">
         {
          w_fasions.map(w_fasion=> <CardRow key={w_fasion._id} data={w_fasion}></CardRow>)
         }
        </div>
        </AttentionSeeker >
        <AttentionSeeker effect="pulse" className=" shadow-md shadow-primary w-[100%] ">
          <div className="flex flex-col justify-between items-start gap-3 p-2 py-10">
         {
          kids.map(kid=> <CardRow key={kid._id} data={kid}></CardRow>)
         }
        </div>
        </AttentionSeeker >
        
        
      </div>
    </div>
  );
};

export default Categories;
