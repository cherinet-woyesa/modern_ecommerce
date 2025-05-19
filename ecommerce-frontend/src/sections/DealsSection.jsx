import React from 'react';
import { Link } from 'react-router-dom';

const deals = [
  {
    id: 1,
    title: 'Summer Sale',
    description: 'Up to 50% off on summer collection',
    discount: '50%',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    category: 'Fashion'
  },
  {
    id: 2,
    title: 'Tech Bundle',
    description: 'Save 30% on selected electronics',
    discount: '30%',
    image: 'https://images.unsplash.com/photo-1511227130576-6d880d46d90c?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics'
  },
  {
    id: 3,
    title: 'Home Essentials',
    description: '25% off on selected home items',
    discount: '25%',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    category: 'Home & Living'
  },
  {
    id: 4,
    title: 'Sports Gear',
    description: 'Buy 2 get 1 free on selected items',
    discount: 'Free',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    category: 'Sports'
  }
];

const DealsSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Deals of the Day</h2>
          <p className="text-gray-600">Limited time offers that you won't want to miss</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <div 
              key={deal.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="relative">
                <img 
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="text-sm font-semibold px-4 py-2 rounded-full text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300">
                    {deal.discount} OFF
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{deal.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{deal.description}</p>
                <Link
                  to={`/category/${deal.category.toLowerCase().replace(' ', '-')}`}
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
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

export default DealsSection;
