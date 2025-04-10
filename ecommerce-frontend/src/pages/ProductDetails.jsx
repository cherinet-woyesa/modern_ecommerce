import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Product = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  // In a real app, you'd fetch this data based on the ID
  const product = {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    image: 'https://via.placeholder.com/600',
    rating: 4.5,
    reviews: 124,
    inStock: true
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full rounded-lg"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
          </div>
          
          <p className="text-2xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="flex items-center mb-6">
            <span className="mr-4">Quantity:</span>
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-200 rounded-l"
            >
              -
            </button>
            <span className="px-4 py-1 bg-gray-100">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="px-3 py-1 bg-gray-200 rounded-r"
            >
              +
            </button>
          </div>
          
          <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mb-4">
            Add to Cart
          </button>
          
          <button className="w-full bg-accent text-white py-3 rounded-lg hover:bg-orange-600 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;