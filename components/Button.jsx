const Button = ({ onClickHandler, value, title }) => {
  return (
    <button 
      onClick={onClickHandler} 
      value={value} 
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {title}
    </button>
  );
};

export default Button;