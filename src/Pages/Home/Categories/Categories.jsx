
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useCategories from "../../../Hooks/useCategories";
import CardRow from "./CardRow";
import Loading from "../../Shared/Loading/Loading";

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
      <SectionTitle title={"Product Categories"}></SectionTitle>
      <div className=" flex justify-center overflow-hidden pb-5">

        <div className="  shadow-md shadow-primary w-[100%] flex flex-col justify-between items-start gap-3 p-2 py-10">
         {
          phones.map(phone=> <CardRow key={phone._id} data={phone}></CardRow>)
         }
        </div>
        <div className=" shadow-xl shadow-primary w-[100%] flex flex-col justify-between items-start gap-3 p-2 py-10">
         {
          w_fasions.map(w_fasion=> <CardRow key={w_fasion._id} data={w_fasion}></CardRow>)
         }
        </div>
        <div className=" shadow-md shadow-primary w-[100%] flex flex-col justify-between items-start gap-3 p-2 py-10">
         {
          kids.map(kid=> <CardRow key={kid._id} data={kid}></CardRow>)
         }
        </div>
        
        
      </div>
    </div>
  );
};

export default Categories;
