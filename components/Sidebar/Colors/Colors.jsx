import Input from "../../Input";
import { useShop } from "../../../src/Hooks/ShopContext";

const Colors = () => {
  const { handleChange } = useShop();
  
  return (
    <div className="py-2">
      <div className="space-y-2 pl-2">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <input 
              onChange={handleChange} 
              type="radio" 
              value="" 
              name="test1"
              className="appearance-none w-5 h-5 border border-gray-300 rounded-full checked:border-blue-500 checked:border-2 transition-all duration-200 cursor-pointer"
            />
            <span className="absolute top-0 left-0 w-5 h-5 rounded-full bg-blue-500 scale-0 group-hover:scale-75 opacity-0 group-hover:opacity-10 transition-all duration-200"></span>
          </div>
          <span className="text-gray-700 group-hover:text-blue-600 transition-colors">All</span>
        </label>

        <Input
          handleChange={handleChange}
          value="black"
          title="Black"
          name="test1"
          color="black"
        />

        <label className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative">
            <input
              onChange={handleChange}
              type="radio"
              value="white"
              name="test1"
              className="appearance-none w-5 h-5 border border-gray-300 rounded-full checked:border-blue-500 checked:border-2 transition-all duration-200 cursor-pointer"
            />
            <span className="absolute top-0 left-0 w-5 h-5 bg-white border-2 border-gray-300 rounded-full"></span>
          </div>
          <span className="text-gray-700 group-hover:text-blue-600 transition-colors">White</span>
        </label>
        
        <Input
          handleChange={handleChange}
          value="blue"
          title="Blue"
          name="test1"
          color="blue"
        />
        
        <Input
          handleChange={handleChange}
          value="red"
          title="Red"
          name="test1"
          color="red"
        />
        
        <Input
          handleChange={handleChange}
          value="green"
          title="Green"
          name="test1"
          color="green"
        />
      </div>
    </div>
  );
};

export default Colors;