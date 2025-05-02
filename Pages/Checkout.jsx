import { Link } from "react-router-dom";
import Navigation from "../components/Nav";
import { useShop } from "../src/Hooks/ShopContext";
import { HiOutlineHome } from "react-icons/hi";

function Checkout() {
  const { cartItems } = useShop();
  
  const subtotal = cartItems.reduce((total, item) => total + (Number(item.newPrice) * item.quantity), 0);
  const shipping = 10;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <Link to="/" className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
            <HiOutlineHome className="mr-2" size={20} />
            Return to Homepage
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
              <Link to="/" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
                Back to Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  {cartItems.map((item) => (
                    <div key={item.title} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <img src={item.img} alt={item.title} className="w-16 h-16 object-contain mr-4" />
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${Number(item.newPrice) * item.quantity}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                      </div>
                    </div>
                  </form>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <div className="bg-gray-50 p-4 rounded-md border">
                    <p className="text-sm text-gray-500">Payment options will be integrated here</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-md border">
                  <h2 className="text-xl font-semibold mb-4">Order Total</h2>
                  <div className="space-y-2 border-b pb-4 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700">
                    Place Order
                  </button>
                  
                  <Link to="/" className="mt-4 block text-center text-blue-600 hover:text-blue-800">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;