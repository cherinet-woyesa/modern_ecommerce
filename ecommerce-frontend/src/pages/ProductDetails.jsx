import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext'; // Make sure this is the correct import for your CartContext

const ProductDetails = () => {
  const { id } = useParams();  // Get product ID from URL
  const { addToCart } = useCart();  // Use the hook inside the component
  const [product, setProduct] = useState(null);

  // Mock product data (replace with your actual API call if needed)
  const mockProducts = [
    {
      _id: '1',
      name: 'Wireless Headphones',
      price: 79.99,
      description: 'High-quality sound with noise cancellation.',
      image: 'https://images.unsplash.com/photo-1585386959984-a41552263f80?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '2',
      name: 'Smartphone Stand',
      price: 19.99,
      description: 'Sleek and adjustable stand for all phones.',
      image: 'https://images.unsplash.com/photo-1580933935271-16eec41f3226?auto=format&fit=crop&w=800&q=80',
    },
  ];

  useEffect(() => {
    const found = mockProducts.find((p) => p._id === id);  // Find the product by ID
    setProduct(found);
  }, [id]);

  if (!product) {
    return <div className="text-center mt-10 text-gray-600">Product not found.</div>;  // Display if product is not found
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg shadow"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl text-blue-600 font-bold mb-6">${product.price.toFixed(2)}</p>
          {/* Call addToCart with the product */}
          <button
            onClick={() => addToCart(product)}  // Pass the product to the addToCart function
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
