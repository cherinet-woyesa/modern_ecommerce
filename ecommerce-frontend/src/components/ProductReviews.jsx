import { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

const ProductReviews = ({ reviews, productId }) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // In a real app, you would submit to your backend
    console.log('Submitting review:', { productId, ...newReview });
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-6">Customer Reviews</h3>
      
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {'★'.repeat(Math.floor(review.rating))}
                  {review.rating % 1 >= 0.5 && <StarHalf className="w-5 h-5 fill-current" />}
                  {'☆'.repeat(5 - Math.ceil(review.rating))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmitReview} className="mt-8">
        <h4 className="text-lg font-semibold mb-4">Write a Review</h4>
        <div className="mb-4">
          <label className="block mb-2">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewReview({...newReview, rating: star})}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block mb-2">Your Review</label>
          <textarea
            id="comment"
            rows="4"
            value={newReview.comment}
            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ProductReviews;