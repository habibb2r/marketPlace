import { TbShoppingBagSearch } from "react-icons/tb";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import Cards from "./Cards";
import { useEffect, useState } from "react";
import ico from "../../assets/for title/002-online-store-location.png";
import ict from "../../assets/for title/001-marketplace.png";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetch(
      `https://market-server-two.vercel.app/allProducts/${filter}?sort=${sort}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.results);
        setCategories(data.uniqueProductCategories);
      });
  }, [filter, sort]);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSorting = (e) => {
    const sorting = parseInt(e.target.value);
    setSort(sorting);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const searchQuery = event.target.elements.searchInput.value;
    console.log(searchQuery);
    // axiosSecure.get(`/searchItem?item=${searchQuery}`)
    // .then(res=>{
    //   console.log(res.data)
    //   if(res.data){
    //     setAllProducts(res.data)
    //   }
    // })
  };

  return (
    <div className="">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-1">
          <label className="input input-primary input-bordered flex items-center gap-2">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                name="searchInput"
                className="grow"
                placeholder="Search Products"
              />
              <button type="submit" className="text-2xl">
                <TbShoppingBagSearch />
              </button>
            </form>
          </label>

          <select
            defaultValue={"All"}
            onClick={handleFilter}
            className="select select-primary select-bordered w-full max-w-xs"
          >
            <option className="bg-accent bg-opacity-20 font-semibold"  value={"All"}>All Products</option>
            {categories.map((category) => (
              <option className="bg-accent bg-opacity-20 font-semibold" key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            defaultValue={0}
            onClick={handleSorting}
            className="select select-primary w-full max-w-xs"
          >
            <option className="bg-success bg-opacity-20 font-semibold" value={0} disabled>
              Sort By
            </option>
            <option className="bg-success bg-opacity-20 font-semibold" value={1}>Price low to high</option>
            <option className="bg-success bg-opacity-20 font-semibold" value={-1}>Price high to low</option>
          </select>
        </div>
        <div>
          <SectionTitle
            title={`${filter} Products`}
            ico={ico}
            ict={ict}
          ></SectionTitle>
          <div className="pt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {allProducts.map((product) => (
              <Cards key={product._id} data={product}></Cards>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
