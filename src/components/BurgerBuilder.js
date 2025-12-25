/**
 * ========================================
 * BURGER BUILDER COMPONENT
 * ========================================
 * Demonstrates: Arrays, Higher Order Functions, ES6, DOM Manipulation
 */

import React, { useState, useMemo } from 'react';
import { useCart } from '../contexts/CartContext';
import {
  getIngredientsByCategory,
  getIngredientById,
  calculateTotalPrice,
  getUniqueIngredientsWithCount
} from '../data/ingredients';
import './BurgerBuilder.css';

// Category labels - Using ES6 object literal
const categoryLabels = {
  bun: "🍞 Buns",
  protein: "🥩 Proteins",
  cheese: "🧀 Cheese",
  veggie: "🥬 Veggies",
  sauce: "🍅 Sauces"
};

// Map ingredient IDs to image filenames
const ingredientImageMap = {
  'sesame-bun': 'bredup.png',
  'whole-wheat-bun': 'bredup.png',
  'beef-patty': 'meat.png',
  'chicken-patty': 'meat.png',
  'veg-patty': 'veg.png',
  'cheddar': 'cheese.png',
  'mozzarella': 'cheese.png',
  'lettuce': 'veg.png',
  'tomato': 'tomota.png',
  'onion': 'onion.png',
  'pickle': 'veg.png',
  'ketchup': 'tomota.png',
  'mayo': 'veg.png',
  'mustard': 'veg.png'
};

const BurgerBuilder = () => {
  const { addToCart } = useCart();
  
  // State management using useState Hook
  const [selectedIngredients, setSelectedIngredients] = useState([
    'sesame-bun',
    'beef-patty',
    'cheddar',
    'lettuce'
  ]);

  /**
   * Calculate total price using useMemo for performance
   * Uses reduce() internally - Higher Order Function
   */
  const totalPrice = useMemo(() => {
    return calculateTotalPrice(selectedIngredients);
  }, [selectedIngredients]);

  /**
   * Get unique ingredients with counts
   * Uses map(), filter(), Set - Higher Order Functions & ES6
   */
  const uniqueIngredients = useMemo(() => {
    return getUniqueIngredientsWithCount(selectedIngredients);
  }, [selectedIngredients]);

  /**
   * Add ingredient - Using spread operator (ES6)
   */
  const addIngredient = (ingredientId) => {
    setSelectedIngredients(prev => [...prev, ingredientId]);
  };

  /**
   * Remove ingredient - Using findIndex & filter (Higher Order Functions)
   */
  const removeIngredient = (ingredientId) => {
    setSelectedIngredients(prev => {
      const index = prev.findIndex(id => id === ingredientId);
      if (index > -1) {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      }
      return prev;
    });
  };

  /**
   * Count ingredient occurrences - Using filter (Higher Order Function)
   */
  const getIngredientCount = (ingredientId) => {
    return selectedIngredients.filter(id => id === ingredientId).length;
  };

  /**
   * Reset burger to default
   */
  const resetBurger = () => {
    setSelectedIngredients(['sesame-bun', 'beef-patty', 'cheddar', 'lettuce']);
  };

  /**
   * Add to cart handler
   */
  const handleAddToCart = () => {
    if (selectedIngredients.length === 0) {
      alert('Please add some ingredients to your burger!');
      return;
    }
    
    // Create burger object for cart
    const burger = {
      id: Date.now(),
      name: "Custom Burger",
      type: "custom-burger",
      image: "/burger-hero.png",
      price: totalPrice,
      customizations: {
        ingredients: uniqueIngredients.map(ing => `${ing.name} x${ing.count}`).join(", ")
      }
    };
    
    addToCart(burger);
    alert('Custom burger added to cart!');
  };

  // Categories array
  const categories = ['bun', 'protein', 'cheese', 'veggie', 'sauce'];

  return (
    <div className="burger-builder-container">
      {/* Left Panel - Burger Preview (60%) */}
      <div className="burger-preview-panel">
        <h3 className="panel-title">Your Burger Preview</h3>
        
        <div className="burger-visual">
          {/* Burger Stack Container */}
          <div className="burger-stack">
            {/* Top Bun */}
            <div className="bun-top">
              <img 
                src="/bredup.png" 
                alt="Top Bun" 
                className="bun-image top-bun"
              />
            </div>

            {/* Ingredients Stack - Using map() (Higher Order Function) */}
            <div className="ingredients-stack">
              {selectedIngredients
                .filter(id => !id.includes('bun'))
                .map((ingredientId, index) => {
                  const ingredient = getIngredientById(ingredientId);
                  if (!ingredient) return null;

                  const imageName = ingredientImageMap[ingredientId] || 'veg.png';
                  
                  return (
                    <div
                      key={`${ingredientId}-${index}`}
                      className="ingredient-layer"
                      title={ingredient.name}
                    >
                      <img 
                        src={`/${imageName}`} 
                        alt={ingredient.name} 
                        className="ingredient-image"
                      />
                    </div>
                  );
                })}
            </div>

            {/* Bottom Bun */}
            <div className="bun-bottom">
              <img 
                src="/downbred.png" 
                alt="Bottom Bun" 
                className="bun-image bottom-bun"
              />
            </div>
          </div>
        </div>

        {/* Selected Ingredients List */}
        <div className="selected-ingredients">
          <h4>Ingredients:</h4>
          <div className="ingredient-badges">
            {/* Using map() to render badges - Higher Order Function */}
            {uniqueIngredients.length > 0 ? (
              uniqueIngredients.map(ingredient => (
                <span key={ingredient.id} className="ingredient-badge">
                  {ingredient.emoji} {ingredient.name}
                  {ingredient.count > 1 ? ` x${ingredient.count}` : ''}
                </span>
              ))
            ) : (
              <span className="no-ingredients">No ingredients</span>
            )}
          </div>
        </div>

        {/* Total & Actions */}
        <div className="burger-footer">
          <div className="total-price">
            <span className="price-label">Total:</span>
            <span className="price-amount">₹{totalPrice}</span>
          </div>
          <div className="action-buttons">
            <button className="btn-reset" onClick={resetBurger}>
              Reset
            </button>
            <button className="btn-add-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Ingredients (40%) */}
      <div>
        <h3 className="panel-title">Choose Ingredients</h3>
        
        <div className="categories-container">
          {categories.map(category => (
            <div key={category} className="category-section">
              <h4 className="category-title">{categoryLabels[category]}</h4>
              
              <div className="ingredients-grid">
                {getIngredientsByCategory(category).map(ingredient => (
                  <div key={ingredient.id} className="ingredient-item">
                    <div className="ingredient-info">
                      <span className="ingredient-icon">{ingredient.emoji}</span>
                      <div className="ingredient-details">
                        <h5 className="ingredient-name">{ingredient.name}</h5>
                        <p className="ingredient-price">₹{ingredient.price}</p>
                      </div>
                    </div>
                    
                    <div className="ingredient-controls">
                      <button 
                        className="btn-minus"
                        onClick={() => removeIngredient(ingredient.id)}
                        disabled={!selectedIngredients.includes(ingredient.id)}
                      >
                        -
                      </button>
                      
                      <span className="ingredient-count">
                        {getIngredientCount(ingredient.id)}
                      </span>
                      
                      <button 
                        className="btn-plus"
                        onClick={() => addIngredient(ingredient.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BurgerBuilder;