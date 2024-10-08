import About from "../About/About";
import Banner from "../Banner/Banner";
import EraSlide from "../AdBoard/EraSlide";

import BuyStall from "../BuyStall/BuyStall";
import Categories from "../Categories/Categories";
import DiscountProducts from "../DiscountProducts/DiscountProducts";
import Reviews from "../Reviews/Reviews";
import TopStalls from "../TopStalls/TopStalls";


const Home = () => {
    return (
        <>
           <Banner></Banner>
           <About></About>
           <Categories></Categories>
           <DiscountProducts></DiscountProducts>
           <BuyStall></BuyStall>
           <TopStalls></TopStalls>
           <EraSlide></EraSlide>
           <Reviews></Reviews>

        </>
    );
};

export default Home;