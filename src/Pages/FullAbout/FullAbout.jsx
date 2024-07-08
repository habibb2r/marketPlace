import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const FullAbout = () => {
  return (
    <div className=" px-[10%]">
      <SectionTitle title={"About Panda MarkePlace"}></SectionTitle>
      <div className="flex flex-col justify-center items-center gap-5 py-10">
        <h1 className="text-3xl text-center font-semibold">
          Welcome to Panda MarketPlace: Your Ultimate Online Shopping
          Destination
        </h1>
        <p className="text-justify font-light text-xl">
          Panda MarketPlace is your one-stop destination for all your shopping
          needs, offering a diverse and vibrant online marketplace where you can
          find a wide array of products across various categories. Our platform
          is designed to provide a seamless shopping experience, connecting
          buyers with sellers from all over the world. Here is what makes Panda
          MarketPlace the best place to shop online: <br /> <br />
          <span className="font-bold">Diverse Categories</span> <br />
          At Panda MarketPlace, we understand that every shopper is unique, with
          different tastes and needs. That is why we have organized our marketplace
          into distinct categories, each offering a curated selection of
          products. Whether you are looking for the latest fashion trends,
          cutting-edge electronics, or everyday essentials, you will find it all
          here. Explore our popular categories: <br />
          <ul>
            <li>
              <p>
                <span className="font-bold">Fashion & Apparel: </span> Discover
                a wide range of clothing, accessories, and footwear for men,
                women, and children. From high-end designer labels to affordable
                everyday wear, our fashion stalls have something for everyone.
              </p>
            </li>

            <li>
              <p>
                <span className="font-bold"> Electronics & Gadgets: </span>
                Stay ahead with the latest technology. Shop for smartphones,
                laptops, home appliances, and more from top brands and emerging
                innovators.
              </p>
            </li>
            <li>
              <p>
                <span className="font-bold"> Toys & Games: </span>
                Bring joy to children and adults alike with our diverse range of
                toys, games, and hobbies. Find educational toys, board games,
                and outdoor fun for all ages.
              </p>
            </li>
            <li>
              <p>
                <span className="font-bold"> Beauty & Health: </span>
                Pamper yourself with our extensive range of beauty and health
                products. From skincare and makeup to wellness and fitness
                equipment, we have got you covered.
              </p>
            </li>
            <li></li>
          </ul>
          <br />
          <br />
          <span className="font-bold"> Easy Navigation and Search: </span> Panda
          MarketPlace is designed with user experience in mind. Our intuitive
          interface allows you to easily browse through different categories,
          use filters to narrow down your search, and find exactly what you are
          looking for. With advanced search options, you can quickly locate
          specific products or discover new items that match your interests.{" "}
          <br />
          <span className="font-bold"> Secure and Convenient Shopping: </span>
          Your safety and satisfaction are our top priorities. Panda MarketPlace
          ensures secure transactions with multiple payment options, including
          credit cards, digital wallets, and more. Our user-friendly checkout
          process makes shopping quick and hassle-free. Plus, we offer reliable
          customer support to assist you with any inquiries or issues you may
          encounter. <br />
          <span className="font-bold"> Connect with Sellers: </span>
          At Panda MarketPlace, we believe in fostering a community of trust and
          transparency. Each seller has a dedicated stall where you can explore
          their product offerings, read reviews from other buyers, and
          communicate directly with them for any questions or custom requests.
          Our rating and feedback system helps you make informed decisions and
          shop with confidence. <br />
          <span className="font-bold"> Exciting Deals and Promotions: </span>
          Who does nott love a good deal? Panda MarketPlace regularly features
          special promotions, discounts, and flash sales across all categories.
          Sign up for our newsletter to stay updated on the latest offers and
          never miss out on a great bargain. <br />
          <span className="font-bold">
            Join the Panda MarketPlace Community:
          </span>
          Become a part of the Panda MarketPlace community today and experience
          the joy of online shopping like never before. Whether you are a buyer
          looking for quality products or a seller aiming to reach a wider
          audience, Panda MarketPlace is the perfect platform for you. Start
          exploring our marketplace now and find everything you need, all in one
          place. <br />
          <span className="text-2xl font-semibold font-sans text-center">Happy shopping at Panda MarketPlace!</span>
        </p>
      </div>
    </div>
  );
};

export default FullAbout;
