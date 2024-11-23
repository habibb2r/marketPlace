
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useCategories from "../../../Hooks/useCategories";
import CardRow from "./CardRow";
import Loading from "../../Shared/Loading/Loading";
import cateic from '../../../assets/for title/004-menu.png'
import cateict from '../../../assets/for title/012-seo.png'
import {motion} from 'framer-motion'

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
      <div className=" flex flex-col lg:flex-row justify-center overflow-hidden pb-10 gap-4 px-1">

        <motion.div initial={{opacity: 0, scale: 0.8}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.9, ease: 'easeInOut'}}    className="shadow-md shadow-primary w-[100%] rounded-3xl hover:shadow-xl hover:shadow-success hover:transition-shadow border  bg-secondary bg-opacity-5">
        <div className="  flex flex-col justify-between items-start gap-3 p-2 py-10 ">
          <p className="font-sans font-semibold px-4 py-3 text-xl bg-success bg-opacity-30 rounded-2xl">Mobile / Smart Phones</p>
         {
          phones.map(phone=> <CardRow key={phone._id} data={phone}></CardRow>)
         }
        </div>
        </motion.div >
        
        <motion.div initial={{opacity: 0, scale: 0.8}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.9, ease: 'easeInOut'}}    className=" shadow-md shadow-primary w-[100%] rounded-3xl hover:shadow-xl hover:shadow-success hover:transition-shadow border  bg-secondary bg-opacity-5">
          <div className="flex flex-col justify-between items-start gap-3 p-2 py-10 ">
            <p className="font-sans font-semibold px-4 py-3 text-xl bg-success bg-opacity-30 rounded-2xl">Women Fashion Collection</p>
         {
          w_fasions.map(w_fasion=> <CardRow key={w_fasion._id} data={w_fasion}></CardRow>)
         }
        </div>
        </motion.div >
        <motion.div initial={{opacity: 0, scale: 0.8}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.9, ease: 'easeInOut'}}  className=" shadow-md shadow-primary w-[100%] rounded-3xl hover:shadow-xl hover:shadow-success hover:transition-shadow border  bg-secondary bg-opacity-5">
          <div className="flex flex-col justify-between items-start gap-3 p-2 py-10 ">
            <p className="font-sans font-semibold px-4 py-3 text-xl bg-success bg-opacity-30 rounded-2xl">Kids Collection</p>
         {
          kids.map(kid=> <CardRow key={kid._id} data={kid}></CardRow>)
         }
        </div>
        </motion.div >
        
        
      </div>
    </div>
  );
};

export default Categories;
