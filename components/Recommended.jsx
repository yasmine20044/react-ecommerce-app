import Button from "./Button";
import { useShop } from "../src/Hooks/ShopContext";

const Recommended = () => {
  const { handleClick } = useShop();
  
  return (
    <div className="py-8 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended</h2>
      <div className="flex flex-wrap gap-3">
        <Button onClickHandler={handleClick} value="" title="All Products" />
        <Button onClickHandler={handleClick} value="Nike" title="Nike" />
        <Button onClickHandler={handleClick} value="Adidas" title="Adidas" />
        <Button onClickHandler={handleClick} value="Vans" title="Vans" />
      </div>
    </div>
  );
};

export default Recommended;