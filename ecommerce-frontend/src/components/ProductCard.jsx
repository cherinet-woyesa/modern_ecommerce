import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <div 
      className="bg-white border rounded-xl shadow hover:shadow-lg transition duration-200 overflow-hidden group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </Link>
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition"
        >
          <FiHeart className={`w-5 h-5 ${isWishlist ? 'text-red-500' : 'text-gray-400'}`} />
        </button>

        {/* Stock Status */}
        {product.stock < 10 && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
            Low Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
        </div>

        <p className="text-blue-600 font-bold mt-1">${product.price.toFixed(2)}</p>

        {/* Action Buttons */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <FiShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <Link
            to={`/products/${product._id}`}
            className="flex-1 bg-gray-100 text-gray-800 text-sm px-3 py-2 rounded hover:bg-gray-200 transition flex items-center justify-center gap-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
