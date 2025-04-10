import { Link } from 'react-router-dom';
import { Eye, Heart } from 'lucide-react';
import { useState } from 'react';

const ProductCard = ({ product, onQuickView }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="relative group">
        <Link to={`/product/${product.id}`} className="block">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
            />
          </button>
          <button 
            onClick={() => onQuickView(product)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            title="Quick View"
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block flex-grow">
          <h3 className="text-lg font-semibold text-dark hover:text-primary mb-2">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
          </div>
        </Link>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <button 
            className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
            onClick={() => onQuickView(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;