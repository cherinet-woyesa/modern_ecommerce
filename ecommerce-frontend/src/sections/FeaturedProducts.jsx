import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar, FiArrowRight } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';

const products = [
  {
    id: 1,
    name: 'Premium Smart Watch',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    rating: 4.8,
    reviews: 124,
    colors: ['#000000', '#3b82f6', '#ef4444'],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 2,
    name: 'Designer Sunglasses',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    category: 'Fashion',
    rating: 4.5,
    reviews: 89,
    colors: ['#000000', '#a855f7'],
    isTrending: true
  },
  {
    id: 3,
    name: 'Wireless Headphones',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1527175639230-87c5f3842056?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    rating: 4.9,
    reviews: 215,
    colors: ['#000000', '#f59e0b'],
    isBestSeller: true
  },
  {
    id: 4,
    name: 'Leather Backpack',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800&q=80',
    category: 'Fashion',
    rating: 4.7,
    reviews: 156,
    colors: ['#000000', '#78716c', '#dc2626'],
    isNew: true
  }
];

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <section className="featured-products py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-1/4 w-40 h-40 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-60 h-60 rounded-full bg-purple-500 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-full">
            <RiFlashlightFill className="text-yellow-500" />
            <span className="text-sm font-semibold">TRENDING PRODUCTS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Collection</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products loved by thousands
          </p>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    BESTSELLER
                  </span>
                )}
                {product.isTrending && (
                  <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    TRENDING
                  </span>
                )}
              </div>
              
              {/* Quick actions */}
              <div className={`absolute top-4 right-4 z-10 flex flex-col gap-2 transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  <FiHeart className="text-gray-700" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  <FiEye className="text-gray-700" />
                </button>
              </div>
              
              {/* Product image */}
              <div className="relative overflow-hidden h-80">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-transform duration-500 ${hoveredProduct === product.id ? 'scale-105' : 'scale-100'}`}
                />
                
                {/* Add to cart button */}
                <button className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <FiShoppingCart /> Add to Cart
                </button>
              </div>
              
              {/* Product info */}
              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                </div>
                
                <h3 className="font-semibold text-lg text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                
                <p className="text-gray-500 text-sm mb-3">{product.category}</p>
                
                {/* Color options */}
                <div className="flex gap-2 mb-4">
                  {product.colors.map((color) => (
                    <div 
                      key={color}
                      className="w-5 h-5 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {/* Discount badge */}
                  {product.originalPrice && (
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-16">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            View All Products <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;