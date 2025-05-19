import React from 'react';
import { FaTruck, FaCreditCard, FaHeadset, FaBoxOpen } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: FaTruck,
      title: 'Fast Shipping',
      description: 'We deliver your products right to your doorstep within 2-3 business days.'
    },
    {
      icon: FaCreditCard,
      title: 'Secure Payments',
      description: '100% secure payment processing. We accept all major credit cards and digital wallets.'
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Our dedicated customer support team is available 24/7 to assist you with any questions.'
    },
    {
      icon: FaBoxOpen,
      title: 'Easy Returns',
      description: '30-day hassle-free returns. If you\'re not satisfied, we\'ll make it right.'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to ShopX, your one-stop destination for premium products and exceptional shopping experience.
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Founded in 2024, ShopX has quickly become one of the leading e-commerce platforms in the industry. 
                Our mission is to provide customers with the best shopping experience through quality products, 
                competitive prices, and exceptional customer service.
              </p>
              <p className="text-gray-600">
                We believe in building long-term relationships with our customers by providing transparency, 
                reliability, and value in every transaction. Our team is passionate about creating a seamless 
                shopping experience that exceeds expectations.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-2xl text-purple-600 mr-3">✓</span>
                  <span className="text-gray-600">Customer Satisfaction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl text-purple-600 mr-3">✓</span>
                  <span className="text-gray-600">Quality Products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl text-purple-600 mr-3">✓</span>
                  <span className="text-gray-600">Transparency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl text-purple-600 mr-3">✓</span>
                  <span className="text-gray-600">Innovation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-purple-600 text-4xl mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
