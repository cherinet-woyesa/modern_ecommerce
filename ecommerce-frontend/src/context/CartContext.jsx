import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && item.color === product.color
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.color === product.color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { 
        ...product, 
        quantity,
        addedAt: new Date().toISOString() 
      }];
    });
  };

  const removeFromCart = (productId, color = null) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        color ? !(item.id === productId && item.color === color) : item.id !== productId
      )
    );
  };

  const updateQuantity = (productId, newQuantity, color = null) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        color 
          ? (item.id === productId && item.color === color) 
            ? { ...item, quantity: newQuantity }
            : item
          : item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const moveToWishlist = (productId) => {
    const product = cartItems.find(item => item.id === productId);
    if (product) {
      addToWishlist(product);
      removeFromCart(productId);
    }
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Calculate derived values
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const wishlistCount = wishlist.length;

  // Get unique cart items (for display purposes)
  const uniqueCartItems = cartItems.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id && i.color === item.color);
    if (!existing) {
      acc.push(item);
    }
    return acc;
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        uniqueCartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        moveToWishlist,
        wishlist,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}