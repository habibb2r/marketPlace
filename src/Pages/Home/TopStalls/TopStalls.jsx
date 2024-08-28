import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import TopStallsSection from "./TopStallsSection";
import ico from '../../../assets/for title/application.png'
import ict from '../../../assets/for title/computer.png'
import { Slide } from "react-awesome-reveal";


const TopStalls = () => {
    return (
        <div className="py-10">
            <SectionTitle ico={ico} ict={ict} title={'Our Products'}></SectionTitle>
            <Slide direction="right">
            <TopStallsSection></TopStallsSection>
            </Slide>
        </div>
    );
};

export default TopStalls;