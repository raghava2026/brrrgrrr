import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const { items, totalItems, totalPrice, removeFromCart, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const handleRemoveItem = (cartId) => {
    removeFromCart(cartId);
  };
  
  const handleCheckout = () => {
    setIsCheckout(true);
  };
  
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In a real app, you would send the order to your backend here
    setOrderPlaced(true);
    clearCart();
    
    // Close cart after 3 seconds
    setTimeout(() => {
      onClose();
      setIsCheckout(false);
      setOrderPlaced(false);
    }, 3000);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {orderPlaced ? (
          <div className="order-success">
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for your order. Your delicious burgers are on the way!</p>
          </div>
        ) : isCheckout ? (
          <div className="checkout-form">
            <h3>Checkout</h3>
            <form onSubmit={handlePlaceOrder}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <textarea id="address" required></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="payment">Payment Method</label>
                <select id="payment" required>
                  <option value="">Select Payment Method</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                </select>
              </div>
              
              <div className="order-summary">
                <h4>Order Summary</h4>
                <div className="summary-item">
                  <span>Items ({totalItems}):</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="summary-item">
                  <span>Delivery:</span>
                  <span>FREE</span>
                </div>
                <div className="summary-item total">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
              
              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </form>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.cartId} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    {item.customizations && (
                      <div className="customizations">
                        {Object.entries(item.customizations).map(([key, value]) => (
                          <span key={key} className="customization-tag">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="item-price">₹{item.price}</p>
                  </div>
                  
                  <div className="item-actions">
                    <div className="quantity">
                      <span>Qty: {item.quantity}</span>
                    </div>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.cartId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total ({totalItems} items):</span>
                <span className="total-price">₹{totalPrice}</span>
              </div>
              
              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;