import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-200 mb-8">Get the latest updates, promotions, and new arrivals straight to your inbox.</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <form className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-800"
              />
              <button 
                type="submit"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100 transition duration-300"
              >
                Subscribe
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-purple-600"
              />
              <label className="text-gray-200 text-sm">
                I agree to receive marketing emails from ShopX
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
