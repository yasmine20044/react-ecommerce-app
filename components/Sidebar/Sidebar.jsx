import { useState } from "react";
import Category from "./Category/Category";
import Price from "./Price/Price";
import Colors from "./Colors/Colors";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useShop } from "../../src/Hooks/ShopContext";

const Sidebar = () => {
  const { handleChange } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState({
    category: true,
    price: true,
    colors: true
  });

  const toggleSection = (section) => {
    setOpenSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-20"
      >
        <IoFilterSharp size={24} />
      </button>
    
      <section className={`bg-white shadow-xl w-72 h-screen fixed left-0 -top-2 z-10 border-r border-gray-200 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex justify-between items-center py-6 border-b border-gray-200 px-5 flex-shrink-0">
          <h1 className="text-2xl font-bold text-blue-600">🛒 Filter</h1>
          <button 
            onClick={toggleSidebar} 
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>
        
        <div className="p-5 space-y-2 overflow-y-auto flex-grow">
          {/* Collapsible Category Section */}
          <div className="border-b border-gray-100 pb-2">
            <button 
              onClick={() => toggleSection('category')} 
              className="flex justify-between items-center w-full py-2"
            >
              <h2 className="text-xl font-semibold text-gray-800">Category</h2>
              {openSection.category ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowDown size={22} />}
            </button>
            {openSection.category && <Category />}
          </div>
          
          {/* Collapsible Price Section */}
          <div className="border-b border-gray-100 pb-2">
            <button 
              onClick={() => toggleSection('price')} 
              className="flex justify-between items-center w-full py-2"
            >
              <h2 className="text-xl font-semibold text-gray-800">Price</h2>
              {openSection.price ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowDown size={22} />}
            </button>
            {openSection.price && <Price />}
          </div>
          
          {/* Collapsible Colors Section */}
          <div className="border-b border-gray-100 pb-2">
            <button 
              onClick={() => toggleSection('colors')} 
              className="flex justify-between items-center w-full py-2"
            >
              <h2 className="text-xl font-semibold text-gray-800">Colors</h2>
              {openSection.colors ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowDown size={22} />}
            </button>
            {openSection.colors && <Colors />}
          </div>
          
          {/* Reset Button */}
          <div className="pt-4">
            <button
              onClick={() => handleChange({ target: { value: "", name: "reset" }})}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
