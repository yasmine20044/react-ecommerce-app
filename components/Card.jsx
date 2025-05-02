import { BsFillBagFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useShop } from "../src/Hooks/ShopContext";
import { useNavigate } from "react-router-dom";

const Card = ({ img, title, star, reviews, prevPrice, newPrice, product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useShop();
  const navigate = useNavigate();
  const isProductFavorite = isFavorite(product.id);
  
  const handleProductClick = () => {
    navigate(`/Product/${product.id}`);
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div 
        className="relative w-full aspect-square overflow-hidden bg-gray-100 cursor-pointer" 
        onClick={handleProductClick}
      >
        <img 
          src={img} 
          alt={title} 
          className={`w-full h-full object-contain transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'} hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
        >
          {isProductFavorite ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FiHeart className="text-gray-600 hover:text-red-500 text-xl" />
          )}
        </button>
      </div>
      <div className="p-4 flex-grow">
        <h3 
          className="text-lg font-semibold text-gray-800 mb-2 truncate cursor-pointer hover:text-blue-600" 
          onClick={handleProductClick}
        >
          {title}
        </h3>
        <div className="flex items-center mb-2">
          <span className="flex text-yellow-400">
            {star} {star} {star} {star}
          </span>
          <span className="text-sm text-gray-500 ml-1">({reviews})</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <del className="text-gray-500 text-sm mr-1">{prevPrice}</del>
            <span className="font-bold text-blue-600">${newPrice}</span>
          </div>
          <button 
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            aria-label="Add to cart"
          >
            <BsFillBagFill className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
