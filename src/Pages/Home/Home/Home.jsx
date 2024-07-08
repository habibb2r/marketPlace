import About from "../About/About";
import Banner from "../Banner/Banner";
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
           <Reviews></Reviews>
        </>
    );
};

export default Home;