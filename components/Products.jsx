import { useShop } from "../src/Hooks/ShopContext";
import Card from "./Card";

const Products = () => {
  const { filteredProducts, addToCart } = useShop();
  
  return (
    <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <Card
          key={Math.random()}
          product={product}
          img={product.img}
          title={product.title}
          star={product.star}
          reviews={product.reviews}
          prevPrice={product.prevPrice}
          newPrice={product.newPrice}
          addToCart={() => addToCart(product)}
        />
      ))}
    </section>
  );
};

export default Products;