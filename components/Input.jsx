const Input = ({ handleChange, value, title, name, color }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer group">
      <div className="relative">
        <input 
          onChange={handleChange} 
          type="radio" 
          value={value} 
          name={name}
          className="appearance-none w-5 h-5 border border-gray-300 rounded-full checked:border-blue-500 checked:border-2 transition-all duration-200 cursor-pointer"
        />
        {color && (
          <span className="absolute top-0 left-0 w-5 h-5 rounded-full" style={{ backgroundColor: color }}></span>
        )}
        {!color && (
          <span className="absolute top-0 left-0 w-5 h-5 rounded-full bg-blue-500 scale-0 group-hover:scale-75 opacity-0 group-hover:opacity-10 transition-all duration-200"></span>
        )}
      </div>
      <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{title}</span>
    </label>
  );
};

export default Input;