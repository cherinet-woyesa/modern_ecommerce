import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiCreditCard,
  FiUser,
  FiMail,
  FiMapPin,
  FiTruck,
  FiLock,
  FiChevronLeft,
  FiCheck,
  FiShield
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zip: '',
    phone: '',
    shippingMethod: 'standard',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    cardExp: '',
    cardCvc: '',
    saveInfo: false,
    agreeTerms: false
  });

  // Calculate order totals
  const shippingCost = formData.shippingMethod === 'express' ? 9.99 : 0;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingCost + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zip) newErrors.zip = 'ZIP code is required';
    }
    
    if (step === 3 && formData.paymentMethod === 'credit') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.cardExp) newErrors.cardExp = 'Expiration date is required';
      if (!formData.cardCvc) newErrors.cardCvc = 'Security code is required';
    }
    
    if (step === 3 && !formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart and proceed to confirmation
      clearCart();
      navigate('/order-confirmed', { 
        state: { 
          orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
          orderTotal: grandTotal.toFixed(2),
          customerName: `${formData.firstName} ${formData.lastName}`,
          deliveryDate: new Date(Date.now() + (formData.shippingMethod === 'express' ? 2 : 5) * 24 * 60 * 60 * 1000).toLocaleDateString()
        } 
      });
    }
  };

  // Render input field with error handling
  const renderInput = (name, label, type = 'text', placeholder = '', options = []) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      {type === 'select' ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-lg ${errors[name] ? 'border-red-500' : ''}`}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg ${errors[name] ? 'border-red-500' : ''}`}
        />
      )}
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  const renderStep = () => {
    switch(step) {
      case 1: return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-6">Contact Information</h2>
          
          {renderInput('email', 'Email', 'email', 'your@email.com')}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderInput('firstName', 'First Name')}
            {renderInput('lastName', 'Last Name')}
          </div>
          
          {renderInput('phone', 'Phone', 'tel', '(123) 456-7890')}

          <h2 className="text-xl font-bold mt-8 mb-6">Shipping Address</h2>
          
          {renderInput('address', 'Address', 'text', '123 Main St')}
          {renderInput('apartment', 'Apartment, suite, etc. (optional)')}
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {renderInput('country', 'Country', 'select', '', ['United States', 'Canada', 'United Kingdom'])}
            {renderInput('state', 'State')}
            {renderInput('zip', 'ZIP Code')}
          </div>
          
          {renderInput('city', 'City')}
          
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="saveInfo"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="saveInfo">Save this information for next time</label>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 px-6 py-3 border rounded-lg font-medium hover:bg-gray-50"
            >
              <FiChevronLeft /> Return to Cart
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Continue to Shipping
            </button>
          </div>
        </div>
      );

      case 2: return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-6">Shipping Method</h2>
          
          <div className="space-y-4 mb-8">
            <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.shippingMethod === 'standard' ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'}`}>
              <input
                type="radio"
                name="shippingMethod"
                value="standard"
                checked={formData.shippingMethod === 'standard'}
                onChange={handleInputChange}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-medium">Standard Shipping</div>
                <div className="text-sm text-gray-500">3-5 business days • FREE</div>
              </div>
              <div className="font-medium">$0.00</div>
            </label>
            
            <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.shippingMethod === 'express' ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'}`}>
              <input
                type="radio"
                name="shippingMethod"
                value="express"
                checked={formData.shippingMethod === 'express'}
                onChange={handleInputChange}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-medium">Express Shipping</div>
                <div className="text-sm text-gray-500">1-2 business days</div>
              </div>
              <div className="font-medium">$9.99</div>
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 border rounded-lg font-medium hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      );

      case 3: return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-6">Payment Method</h2>
          
          <div className="space-y-4 mb-6">
            <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'credit' ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={formData.paymentMethod === 'credit'}
                onChange={handleInputChange}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-medium">Credit/Debit Card</div>
                <div className="flex gap-2 mt-2">
                  {['visa', 'mastercard', 'amex'].map(card => (
                    <img key={card} src={`/payment-${card}.svg`} alt={card} className="h-6" />
                  ))}
                </div>
              </div>
              <FiCreditCard className="text-gray-500" />
            </label>
            
            <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={handleInputChange}
                className="mr-3"
              />
              <div className="font-medium">PayPal</div>
              <img src="/payment-paypal.svg" alt="PayPal" className="h-6 ml-auto" />
            </label>
          </div>

          {formData.paymentMethod === 'credit' && (
            <div className="space-y-4 mb-6">
              {renderInput('cardNumber', 'Card Number', 'text', '1234 5678 9012 3456')}
              {renderInput('cardName', 'Name on Card')}
              
              <div className="grid grid-cols-2 gap-4">
                {renderInput('cardExp', 'Expiration Date', 'text', 'MM/YY')}
                {renderInput('cardCvc', 'Security Code', 'text', 'CVC')}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="font-medium mb-4">Billing Address</h3>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="sameAsShipping"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="sameAsShipping">Same as shipping address</label>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="mr-2 mt-1"
            />
            <label htmlFor="agreeTerms" className="text-sm">
              I agree to the Terms of Service and Privacy Policy
            </label>
            {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <FiShield className="text-green-500" />
            <span>Your transaction is secured with SSL encryption</span>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 border rounded-lg font-medium hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2 ${loading ? 'opacity-75' : ''}`}
            >
              {loading ? 'Processing...' : (
                <>
                  <FiLock /> Complete Order
                </>
              )}
            </button>
          </div>
        </form>
      );

      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate('/cart')}
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <FiChevronLeft className="mr-1" /> Cart
            </button>
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between relative mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {stepNumber}
                </div>
                <span className="mt-2 text-sm font-medium">
                  {stepNumber === 1 ? 'Information' : stepNumber === 2 ? 'Shipping' : 'Payment'}
                </span>
              </div>
            ))}
          </div>

          {renderStep()}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-xl sticky top-4">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.color}`} className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      {item.color && item.color !== 'N/A' && (
                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                      )}
                    </div>
                  </div>
                  <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <FiTruck className="text-gray-400" />
              <span>
                {formData.shippingMethod === 'express' ? 
                  'Estimated delivery: 1-2 business days' : 
                  'Estimated delivery: 3-5 business days'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;