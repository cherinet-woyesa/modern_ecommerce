import { X } from 'lucide-react';
import { useState } from 'react';


const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-100 rounded-full p-1 hover:bg-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-64 object-contain"
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">★★★★☆</span>
                <span className="text-gray-600 ml-2">(24 reviews)</span>
              </div>
              
              <p className="text-3xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
              
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
              
              <button 
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mb-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;