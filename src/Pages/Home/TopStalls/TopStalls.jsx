import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import TopStallsSection from "./TopStallsSection";
import ico from '../../../assets/for title/application.png'
import ict from '../../../assets/for title/computer.png'
import {motion} from 'framer-motion'


const TopStalls = () => {
    return (
        <div className="py-10">
            <SectionTitle ico={ico} ict={ict} title={'Our Products'}></SectionTitle>
            <motion.div initial={{opacity: 0, scale: 0.8}} whileInView={{opacity: 1, scale: 1}} transition={{duration: 0.9, ease: 'easeInOut'}}>
            <TopStallsSection></TopStallsSection>
            </motion.div>
        </div>
    );
};

export default TopStalls;