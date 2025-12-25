/**
 * Ingredients data for burger customization
 * Using Arrays to store ingredient information
 */

export const ingredients = [
  // Buns
  {
    id: "sesame-bun",
    name: "Sesame Bun",
    category: "bun",
    emoji: "🍞",
    price: 20,
    color: "#D4A574"
  },
  {
    id: "whole-wheat-bun",
    name: "Whole Wheat Bun",
    category: "bun",
    emoji: "🥖",
    price: 25,
    color: "#8B7355"
  },
  
  // Proteins
  {
    id: "beef-patty",
    name: "Beef Patty",
    category: "protein",
    emoji: "🥩",
    price: 80,
    color: "#8B4513"
  },
  {
    id: "chicken-patty",
    name: "Chicken Patty",
    category: "protein",
    emoji: "🍗",
    price: 70,
    color: "#CD853F"
  },
  {
    id: "veg-patty",
    name: "Veg Patty",
    category: "protein",
    emoji: "🌱",
    price: 60,
    color: "#228B22"
  },
  
  // Cheese
  {
    id: "cheddar",
    name: "Cheddar Cheese",
    category: "cheese",
    emoji: "🧀",
    price: 30,
    color: "#FFD700"
  },
  {
    id: "mozzarella",
    name: "Mozzarella",
    category: "cheese",
    emoji: "🧀",
    price: 35,
    color: "#FFFACD"
  },
  
  // Veggies
  {
    id: "lettuce",
    name: "Lettuce",
    category: "veggie",
    emoji: "🥬",
    price: 15,
    color: "#90EE90"
  },
  {
    id: "tomato",
    name: "Tomato",
    category: "veggie",
    emoji: "🍅",
    price: 15,
    color: "#FF6347"
  },
  {
    id: "onion",
    name: "Onion",
    category: "veggie",
    emoji: "🧅",
    price: 10,
    color: "#DDA0DD"
  },
  {
    id: "pickle",
    name: "Pickle",
    category: "veggie",
    emoji: "🥒",
    price: 12,
    color: "#6B8E23"
  },
  
  // Sauces
  {
    id: "ketchup",
    name: "Ketchup",
    category: "sauce",
    emoji: "🍅",
    price: 8,
    color: "#DC143C"
  },
  {
    id: "mayo",
    name: "Mayo",
    category: "sauce",
    emoji: "🥛",
    price: 8,
    color: "#F5F5DC"
  },
  {
    id: "mustard",
    name: "Mustard",
    category: "sauce",
    emoji: "🟡",
    price: 8,
    color: "#FFD700"
  }
];

/**
 * Get ingredients by category
 * Using filter() - Higher Order Function
 */
export const getIngredientsByCategory = (category) => {
  return ingredients.filter(ingredient => ingredient.category === category);
};

/**
 * Get ingredient by ID
 * Using find() - Higher Order Function
 */
export const getIngredientById = (id) => {
  return ingredients.find(ingredient => ingredient.id === id);
};

/**
 * Calculate total price from selected ingredients
 * Using reduce() - Higher Order Function
 */
export const calculateTotalPrice = (selectedIds) => {
  return selectedIds.reduce((total, id) => {
    const ingredient = getIngredientById(id);
    return total + (ingredient ? ingredient.price : 0);
  }, 0);
};

/**
 * Get unique ingredients with counts
 * Using Set, map(), and filter() - ES6 and Higher Order Functions
 */
export const getUniqueIngredientsWithCount = (selectedIds) => {
  const uniqueIds = [...new Set(selectedIds)];
  return uniqueIds.map(id => ({
    ...getIngredientById(id),
    count: selectedIds.filter(selectedId => selectedId === id).length
  }));
};
