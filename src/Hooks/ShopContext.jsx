import { createContext, useContext, useState, useEffect } from "react";
import products from "../../db/data";

// Create the context
const ShopContext = createContext();

// Create a provider component
export function ShopProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [productViews, setProductViews] = useState({});

  // Load favorites and views from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedViews = localStorage.getItem("productViews");
    if (savedViews) {
      setProductViews(JSON.parse(savedViews));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save product views to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("productViews", JSON.stringify(productViews));
  }, [productViews]);

  // Track product views
  const incrementProductView = (productId) => {
    setProductViews(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const getProductViews = (productId) => {
    return productViews[productId] || 0;
  };

  // Input filter functions
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // Radio filtering function
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Button filtering function
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Cart functions
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.title === product.title);
    
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const existingItem = cartItems.find((item) => item.title === product.title);
    
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.title !== product.title));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Favorites functions
  const addToFavorites = (product) => {
    const isAlreadyFavorite = favorites.some(item => item.id === product.id);
    
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  // Filter function for products
  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts;
  }

  // Apply filters and get final product list
  const filteredProducts = filteredData(products, selectedCategory, query);

  // Values to be provided to components
  const value = {
    selectedCategory,
    cartItems,
    showCart,
    query,
    filteredProducts,
    favorites,
    showFavorites,
    handleInputChange,
    handleChange,
    handleClick,
    addToCart,
    removeFromCart,
    toggleCart,
    addToFavorites,
    removeFromFavorites,
    toggleFavorites,
    isFavorite,
    incrementProductView,
    getProductViews
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

// Custom hook to use the shop context
export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
