import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import TopStallsSection from "./TopStallsSection";


const TopStalls = () => {
    return (
        <div className="py-10">
            <SectionTitle title={'Top Stalls'}></SectionTitle>
            <TopStallsSection></TopStallsSection>
        </div>
    );
};

export default TopStalls;