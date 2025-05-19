import React from 'react';
import { FaTruck, FaShieldAlt, FaGift, FaClock } from 'react-icons/fa';

const features = [
  {
    icon: FaTruck,
    title: 'Fast Shipping',
    description: 'Free shipping on orders over $50'
  },
  {
    icon: FaShieldAlt,
    title: 'Secure Payments',
    description: '100% secure payment processing'
  },
  {
    icon: FaGift,
    title: 'Best Deals',
    description: 'Daily discounts and special offers'
  },
  {
    icon: FaClock,
    title: '24/7 Support',
    description: 'Customer support always available'
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-gray-600">Experience the best shopping experience</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition duration-300"
            >
              <feature.icon className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
