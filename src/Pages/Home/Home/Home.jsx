import About from "../About/About";
import Banner from "../Banner/Banner";
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
           <TopStalls></TopStalls>
           <Reviews></Reviews>
        </>
    );
};

export default Home;