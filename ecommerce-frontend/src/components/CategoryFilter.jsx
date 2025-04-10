const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-4 py-2 rounded-full ${!activeCategory ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-full ${activeCategory === category ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default CategoryFilter; // Make sure this is the only export