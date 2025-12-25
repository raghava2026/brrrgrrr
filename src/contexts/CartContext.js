import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create context
const CartContext = createContext();

// Reducer for cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if item already exists in cart
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.type === action.payload.type &&
        JSON.stringify(item.customizations || {}) === JSON.stringify(action.payload.customizations || {})
      );
      
      if (existingItem) {
        // Increase quantity
        return {
          ...state,
          items: state.items.map(item =>
            item === existingItem
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price
        };
      }
      
    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.cartId === action.payload.cartId);
      if (!itemToRemove) return state;
      
      if (itemToRemove.quantity > 1) {
        // Decrease quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.cartId === action.payload.cartId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - itemToRemove.price
        };
      } else {
        // Remove item completely
        return {
          ...state,
          items: state.items.filter(item => item.cartId !== action.payload.cartId),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - itemToRemove.price
        };
      }
      
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
      
    case 'SET_CART':
      return action.payload;
      
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0
  });
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  // Action creators
  const addToCart = (item) => {
    // Add unique cartId for identification
    const itemWithCartId = {
      ...item,
      cartId: Date.now() + Math.random() // Unique ID for this cart item
    };
    dispatch({ type: 'ADD_TO_CART', payload: itemWithCartId });
  };
  
  const removeFromCart = (cartId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { cartId } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider value={{
      items: state.items,
      totalItems: state.totalItems,
      totalPrice: state.totalPrice,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};