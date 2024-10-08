import { TbShoppingBagSearch } from "react-icons/tb";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import Cards from "./Cards";
import { useEffect, useState } from "react";
import ico from "../../assets/for title/002-online-store-location.png";
import ict from "../../assets/for title/001-marketplace.png";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const AllProducts = () => {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');


  const axiosSecure = useAxiosSecure();
  const {
    data: allItems,
    refetch: refetchAllItems,
    isLoading: loadItems,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${
          import.meta.env.VITE_backend_server
        }/allProducts/${filter}?sort=${sort}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    refetchAllItems();
  }, [sort, filter, refetchAllItems]);

  if (loadItems) {
    return <Loading></Loading>;
  }


  const handleFilter = (e) => {

    console.log(e)
    setFilter(e);
    setActiveCategory(e);

  };

  const handleSorting = (e) => {
    const sorting = parseInt(e.target.value);
    setSort(sorting);

  };

  const handleSubmit = (event) => {
    // Todo
    event.preventDefault(); //
    const searchQuery = event.target.elements.searchInput.value;
    console.log(searchQuery);
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
            defaultValue={0}
            onClick={handleSorting}
            className="select select-primary w-full max-w-xs"
          >
            <option
              className="bg-success bg-opacity-20 font-semibold"
              value={0}
              disabled
            >
              Sort By
            </option>
            <option
              className="bg-success bg-opacity-20 font-semibold"
              value={1}
            >
              Price low to high
            </option>
            <option
              className="bg-success bg-opacity-20 font-semibold"
              value={-1}
            >
              Price high to low
            </option>
          </select>
        </div>
        <div>
          <div className="flex flex-wrap justify-center items-center gap-3 px-5 py-3 bg-success bg-opacity-15 mt-3 rounded-md">
          <button onClick={()=>handleFilter('All')} className={`badge ${activeCategory === 'All' ? 'badge-success' : 'badge-warning'}  gap-2 font-semibold`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              All Products
            </button>
            {allItems?.uniqueProductCategories?.map((category) => <button onClick={()=>handleFilter(category)} key={category} className={`badge ${activeCategory === category ? 'badge-success' : 'badge-warning'}  gap-2 font-semibold`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              {category}
            </button>)}
          </div>
          <SectionTitle
            title={`${filter} Products`}
            ico={ico}
            ict={ict}
          ></SectionTitle>
          <div className="pt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {allItems?.results?.map((product) => (
              <Cards
                key={product._id}
                data={product}
                refetchAllItems={refetchAllItems}
              ></Cards>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
