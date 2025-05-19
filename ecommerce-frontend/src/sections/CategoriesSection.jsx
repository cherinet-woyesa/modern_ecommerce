import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Fashion',
    icon: 'shirt',
    description: 'Latest fashion trends for men and women',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Electronics',
    icon: 'mobile-alt',
    description: 'Smartphones, laptops, and gadgets',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Home & Living',
    icon: 'home',
    description: 'Furniture, decor, and home essentials',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sports',
    icon: 'running',
    description: 'Sports equipment and accessories',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80'
  }
];

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p className="text-gray-600">Explore our wide range of product categories</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.name}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img 
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
                <Link
                  to={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                  className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
