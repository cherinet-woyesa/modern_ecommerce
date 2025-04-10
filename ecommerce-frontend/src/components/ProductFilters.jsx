const ProductFilters = ({ 
    categories, 
    activeCategory, 
    sortOption,
    onSelectCategory,
    onSortChange 
  }) => {
    const sortOptions = [
      { value: 'price-asc', label: 'Price: Low to High' },
      { value: 'price-desc', label: 'Price: High to Low' },
      { value: 'rating-desc', label: 'Top Rated' },
      { value: 'newest', label: 'Newest Arrivals' }
    ];
  
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            <button
              onClick={() => onSelectCategory(null)}
              className={`w-full text-left px-4 py-2 rounded-lg ${!activeCategory ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-lg ${activeCategory === category ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
  
        <div>
          <h3 className="text-lg font-semibold mb-3">Sort By</h3>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-primary focus:border-primary"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  export default ProductFilters;