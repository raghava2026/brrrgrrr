import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BurgerBuilder from './components/BurgerBuilder';
import Auth from './components/Auth';
import Cart from './components/Cart';
import { CartProvider, useCart } from './contexts/CartContext';
import { burgers } from './data/burgers';

// Create a wrapper component for the product cards to use the cart context
const ProductCard = ({ burger }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    const cartItem = {
      id: burger.id,
      name: burger.name,
      type: "premade-burger",
      image: burger.image,
      price: burger.price,
      description: burger.description
    };
    
    addToCart(cartItem);
    alert(`${burger.name} added to cart!`);
  };
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={burger.image} alt={burger.name} />
      </div>
      <div className="product-info">
        <h3>{burger.name}</h3>
        <p>{burger.description}</p>
        <span className="price">₹{burger.price}</span>
        <button 
          className="order-btn"
          onClick={handleAddToCart}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    setShowAuth(false);
  };

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      <div className="App">
        <Navbar 
          onShowAuth={handleShowAuth} 
          onShowCart={handleShowCart}
          currentUser={currentUser} 
        />
        
        {showAuth && (
          <div className="auth-overlay">
            <div className="auth-modal">
              <button className="close-btn" onClick={handleCloseAuth}>×</button>
              <Auth onAuthSuccess={handleAuthSuccess} />
            </div>
          </div>
        )}
        
        <Cart isOpen={showCart} onClose={handleCloseCart} />

        {/* Hero Section */}
        <section className="hero-section" id="home">
          <div className="hero-content">
            <div className="hero-left">
              <h1 className="hero-title">Brrrgrrr</h1>
              <h2 className="hero-subtitle">Burgers Done Right</h2>
              <p className="hero-description">
                Customize your burger exactly the way you like it.
                Start from our signature menu or create your own burger from scratch using fresh, quality ingredients.
              </p>
              <div className="hero-buttons">
                <a href="#menu" className="hero-btn btn-primary">View Menu</a>
                <a href="#build" className="hero-btn btn-secondary">Build Your Own</a>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-image">
                <img src="/burger-hero.png" alt="Delicious Burger" className="burger-hero-img" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Products Section */}
        <section className="products-section" id="menu">
          <h2 className="section-heading">Our Products</h2>
          <div className="products-grid">
            {burgers.map((burger) => (
              <ProductCard key={burger.id} burger={burger} />
            ))}
          </div>
        </section>

        {/* Build Your Burger Section */}
        <section className="build-section" id="build">
          <h2 className="section-heading">Build Your Own Burger</h2>
          <p className="build-description">
            Create your perfect burger! Choose from fresh ingredients and watch your burger come to life.
          </p>
          <BurgerBuilder />
        </section>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;