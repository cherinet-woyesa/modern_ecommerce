import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import QuickViewModal from '../components/QuickViewModal';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();

  const productsPerPage = 8;
  const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Sports'];

  // Sample product data - in a real app, you'd fetch this from an API
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      image: '/products/headphones.jpg',
      rating: 4.5,
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      image: '/products/smartwatch.jpg',
      rating: 4.2,
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Cotton T-Shirt',
      price: 24.99,
      image: '/products/tshirt.jpg',
      rating: 4.0,
      category: 'Clothing'
    },
    // Add more products as needed
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate paginated products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="relative">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-96 w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/back.avif')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to ShopEase</h1>
          <p className="text-xl text-white mb-8">Discover amazing products at unbeatable prices</p>
          <Link 
            to="/products" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <CategoryFilter 
              categories={categories} 
              activeCategory={selectedCategory}
              onSelectCategory={(category) => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="md:w-3/4">
            <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No products found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default Home;