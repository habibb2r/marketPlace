import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSearch, 
  FaFilter, 
  FaTh, 
  FaList, 
  FaSortAmountDown,
  FaSortAmountUp,
  FaShoppingBag,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import Cards from "./Cards";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Shared/Loading/Loading";

const AllProducts = () => {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const axiosSecure = useAxiosSecure();
  const {
    data: allItems,
    refetch: refetchAllItems,
    isLoading: loadItems,
  } = useQuery({
    queryKey: ["allProducts", filter, sort, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_backend_server}/allProducts/${filter}?sort=${sort}&search=${search}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    refetchAllItems();
  }, [sort, filter, search, refetchAllItems]);

  const handleFilter = (category) => {
    setFilter(category);
    setActiveCategory(category);
    setSearch("");
    setSearchInput("");
    setCurrentPage(1);
  };

  const handleSorting = (value) => {
    setSort(value);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setFilter("All");
    setActiveCategory("All");
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalProducts = allItems?.results?.length || 0;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = allItems?.results?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Explore Our <span className="text-green-600">Products</span> 🛍️
            </h1>
            <p className="text-gray-600 text-lg">
              {allItems?.results?.length || 0} products available
            </p>
          </div>

          {/* Search and Controls Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Box */}
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  />
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </form>

              {/* Sort Dropdown */}
              <div className="flex gap-3">
                <div className="relative flex-1 lg:w-56">
                  <select
                    value={sort}
                    onChange={(e) => handleSorting(parseInt(e.target.value))}
                    className="w-full appearance-none pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors cursor-pointer bg-white"
                  >
                    <option value={0}>Sort By</option>
                    <option value={1}>Price: Low to High</option>
                    <option value={-1}>Price: High to Low</option>
                  </select>
                  {sort === 1 ? (
                    <FaSortAmountUp className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  ) : sort === -1 ? (
                    <FaSortAmountDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  ) : (
                    <FaSortAmountDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  )}
                </div>

                {/* View Toggle - Hidden on mobile */}
                <div className="hidden md:flex gap-2 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-green-600 shadow-md"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FaTh className="text-xl" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-white text-green-600 shadow-md"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FaList className="text-xl" />
                  </button>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  <FaFilter />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-6 overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaFilter className="text-green-600 text-xl" />
                  <h3 className="text-lg font-bold text-gray-800">Categories</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilter("All")}
                    className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                      activeCategory === "All"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Products
                  </motion.button>
                  {allItems?.uniqueProductCategories?.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFilter(category)}
                      className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                        activeCategory === category
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Active Filter Display */}
        {(search || filter !== "All") && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="text-gray-600">Showing results for:</span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
              {search || filter}
            </span>
          </motion.div>
        )}

        {/* Products Grid/List */}
        {loadItems ? (
          <Loading />
        ) : currentProducts.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {currentProducts.map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <Cards
                    data={product}
                    refetchAllItems={refetchAllItems}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                {/* Page Info */}
                <div className="text-gray-600 text-sm">
                  Showing <span className="font-semibold text-gray-800">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-semibold text-gray-800">
                    {Math.min(indexOfLastItem, totalProducts)}
                  </span>{" "}
                  of <span className="font-semibold text-gray-800">{totalProducts}</span> products
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-3 rounded-xl font-semibold transition-all ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-green-500 hover:text-white shadow-md"
                    }`}
                  >
                    <FaChevronLeft />
                  </motion.button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-2">
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                          ...
                        </span>
                      ) : (
                        <motion.button
                          key={page}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                            currentPage === page
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                              : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                          }`}
                        >
                          {page}
                        </motion.button>
                      )
                    ))}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-3 rounded-xl font-semibold transition-all ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-green-500 hover:text-white shadow-md"
                    }`}
                  >
                    <FaChevronRight />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setFilter("All");
                setActiveCategory("All");
                setSearch("");
                setSearchInput("");
                setCurrentPage(1);
              }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
