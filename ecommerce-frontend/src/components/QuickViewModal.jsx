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
          
          {/* ... rest of the modal content ... */}
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal; // Default export