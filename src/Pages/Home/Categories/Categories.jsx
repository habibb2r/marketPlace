import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useCategories from "../../../Hooks/useCategories";
import CardRow from "./CardRow";
import Loading from "../../Shared/Loading/Loading";
import cateic from '../../../assets/for title/004-menu.png'
import cateict from '../../../assets/for title/012-seo.png'
import {motion} from 'framer-motion'
import './Categories.css'

const Categories = () => {
  const [categ, isLoading] = useCategories();

  if(isLoading){
    return <Loading></Loading>
  }

  const phones = categ.phone.slice(0,4)
  const w_fasions = categ.women_fashion.slice(0,4)
  const kids = categ.kids_fashion.slice(0,4)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const categoryVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="py-10 container mx-auto">
      <SectionTitle title={"Categories"} ico={cateic} ict={cateict}></SectionTitle>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 px-4"
      >
        <motion.div 
          variants={categoryVariants}
          className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10"
        >
          <div className="flex flex-col gap-4 p-6">            <div className="category-header phones-header">              <h3 className="text-xl font-semibold text-gray-800">Mobile & Smart Phones</h3>
            </div>
            <div className="space-y-4">
              {phones.map(phone => (
                <CardRow key={phone._id} data={phone} />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={categoryVariants}
          className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10"
        >
          <div className="flex flex-col gap-4 p-6">            <div className="category-header fashion-header">              <h3 className="text-xl font-semibold text-gray-800">Women Fashion Collection</h3>
            </div>
            <div className="space-y-4">
              {w_fasions.map(w_fasion => (
                <CardRow key={w_fasion._id} data={w_fasion} />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={categoryVariants}
          className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10"
        >
          <div className="flex flex-col gap-4 p-6">            <div className="category-header kids-header">              <h3 className="text-xl font-semibold text-gray-800">Kids Collection</h3>
            </div>
            <div className="space-y-4">
              {kids.map(kid => (
                <CardRow key={kid._id} data={kid} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Categories;
