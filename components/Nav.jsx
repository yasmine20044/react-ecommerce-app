import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { useShop } from "../src/Hooks/ShopContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { handleInputChange, query, cartItems, favorites, toggleFavorites } = useShop();
  const navigate = useNavigate();
  const totalItems = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              className="w-full px-4 py-2 pl-10 pr-12 rounded-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-300"
              type="text"
              onChange={handleInputChange}
              value={query}
              placeholder="Search for shoes..."
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-6 ml-6">
          <button 
            onClick={toggleFavorites} 
            className="text-gray-600 hover:text-red-500 transition-colors relative"
            aria-label="Favorites"
          >
            <FiHeart className="h-6 w-6" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
          <button 
            onClick={goToCheckout} 
            className="text-gray-600 hover:text-blue-600 transition-colors relative"
            aria-label="Shopping Cart"
          >
            <AiOutlineShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
            <AiOutlineUserAdd className="h-6 w-6" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
