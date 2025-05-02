import { Link } from "react-router-dom";
import Navigation from "../components/Nav";
import Products from "../components/Products";
import Recommended from "../components/Recommended";
import Sidebar from "../components/Sidebar/Sidebar";
import { useShop } from "../src/Hooks/ShopContext";
import "../src/index.css";
import { FaTrash } from "react-icons/fa";
import { BsFillBagFill } from "react-icons/bs";

function Homepage() {
  const { 
    showCart, 
    cartItems, 
    toggleCart, 
    removeFromCart, 
    addToCart,
    showFavorites,
    favorites,
    toggleFavorites,
    removeFromFavorites,
    addToCart: addFavoriteToCart
  } = useShop();
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="relative">
        <Navigation />
        <main className="md:ml-72">
          {showFavorites ? (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Favorites</h2>
                <button 
                  onClick={toggleFavorites}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-200"
                >
                  Continue Shopping
                </button>
              </div>
              
              {favorites.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <div className="text-gray-500 mb-4">Your favorites list is empty</div>
                  <button 
                    onClick={toggleFavorites}
                    className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="relative h-48">
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-4">
                        <Link to={`/Product/${item.id}`} className="block">
                          <h3 className="font-medium text-lg text-gray-800 hover:text-blue-600 transition-colors mb-2">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="flex items-center mb-2">
                          <span className="flex text-yellow-400">
                            {item.star} {item.star} {item.star} {item.star}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">{item.reviews}</span>
                        </div>
                        <div className="flex items-center mb-4">
                          <del className="text-gray-500 text-sm mr-2">{item.prevPrice}</del>
                          <span className="font-bold text-blue-600">${item.newPrice}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <button 
                            onClick={() => removeFromFavorites(item.id)}
                            className="flex items-center text-red-500 hover:text-red-700 transition duration-200"
                          >
                            <FaTrash className="mr-1" /> Remove
                          </button>
                          <button 
                            onClick={() => addFavoriteToCart(item)}
                            className="flex items-center bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-200"
                          >
                            <BsFillBagFill className="mr-2" /> Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : showCart ? (
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <div key={item.title} className="flex items-center justify-between bg-white p-4 mb-3 rounded-lg shadow">
                      <div className="flex items-center space-x-4">
                        <img src={item.img} alt={item.title} className="w-16 h-16 object-contain" />
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-blue-600 font-bold">{item.newPrice}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => removeFromCart(item)}
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span className="font-bold">
                        ${cartItems.reduce((total, item) => total + (Number(item.newPrice) * item.quantity), 0)}
                      </span>
                    </div>
                    <Link to="/checkout" className="bg-blue-600 text-white py-2 px-4 rounded w-full block text-center hover:bg-blue-700">
                      Checkout
                    </Link>
                  </div>
                </div>
              )}
              <button 
                onClick={toggleCart}
                className="mt-4 inline-block bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <Recommended />
              <Products />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Homepage;