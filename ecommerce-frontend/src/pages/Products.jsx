import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductReviews from '../components/ProductReviews';

const Products = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { 
    addToCart, 
    addToWishlist, 
    removeFromWishlist, 
    wishlist 
  } = useCart();

  // Sample product data - in a real app, you'd fetch this based on the ID
  const product = {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    price: 199.99,
    images: [
      '/products/headphones-1.jpg',
      '/products/headphones-2.jpg',
      '/products/headphones-3.jpg',
      '/products/headphones-4.jpg'
    ],
    rating: 4.7,
    reviews: [
      {
        id: 1,
        user: 'Alex Johnson',
        rating: 5,
        comment: 'Best headphones I\'ve ever owned! The noise cancellation is amazing.',
        date: '2023-04-15'
      },
      // More reviews...
    ],
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Foldable design'
    ],
    inStock: true
  };

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(product.rating))}
              {product.rating % 1 >= 0.5 && '½'}
              {'☆'.repeat(5 - Math.ceil(product.rating))}
            </div>
            <span className="text-gray-600 ml-2">
              {product.rating} ({product.reviews.length} reviews)
            </span>
          </div>
          
          <p className="text-3xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {product.features && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
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
          
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button 
              onClick={handleWishlistToggle}
              className={`flex-1 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 border ${
                isInWishlist 
                  ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-medium">Availability:</span>
              <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Reviews */}
      <ProductReviews reviews={product.reviews} productId={product.id} />
    </div>
  );
};

export default Products;