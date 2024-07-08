import { TbShoppingBagSearch } from "react-icons/tb";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import Cards from "./Cards";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/allProducts/${filter}?sort=${sort}`)
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
  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center">
          <label className="input input-primary input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search Products" />
            <button className="text-2xl">
              <TbShoppingBagSearch></TbShoppingBagSearch>
            </button>
          </label>

          <select
            defaultValue={"All"}
            onClick={handleFilter}
            className="select select-primary select-bordered w-full max-w-xs"
          >
            <option value={"All"}>All Products</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            defaultValue={0}
            onClick={handleSorting}
            className="select select-primary w-full max-w-xs"
          >
            <option value={0} disabled>
              Sort By
            </option>
            <option value={1}>Price low to high</option>
            <option value={-1}>Price high to low</option>
          </select>
        </div>
        <div>
          <SectionTitle title={`${filter} Products`}></SectionTitle>
          <div className="pt-10 grid grid-cols-4 gap-10">
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
