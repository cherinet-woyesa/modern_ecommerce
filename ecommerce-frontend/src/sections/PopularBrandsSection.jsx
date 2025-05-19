import React from 'react';

const brands = [
  {
    name: 'Apple',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/2560px-Apple_logo_black.svg.png'
  },
  {
    name: 'Nike',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/2560px-Logo_NIKE.svg.png'
  },
  {
    name: 'Samsung',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Samsung_logo.svg/2560px-Samsung_logo.svg.png'
  },
  {
    name: 'Adidas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png'
  },
  {
    name: 'Sony',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Sony_Logo.svg/2560px-Sony_Logo.svg.png'
  },
  {
    name: 'Puma',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Puma_logo.svg/2560px-Puma_logo.svg.png'
  }
];

const PopularBrandsSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Brands</h2>
          <p className="text-gray-600">Trusted brands you can rely on</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="flex items-center justify-center"
            >
              <img 
                src={brand.image}
                alt={brand.name}
                className="h-12 w-auto grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrandsSection;
