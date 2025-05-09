import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../db/data";
import Nav from "../components/Nav";
import { BsFillBagFill } from "react-icons/bs";
import { useShop } from "../src/Hooks/ShopContext";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigate = useNavigate();
    const { addToCart, incrementProductView, getProductViews } = useShop();

    useEffect(() => {
        // Convert the id from string to number and find the product
        const productId = parseInt(id);
        const foundProduct = data.find(p => p.id === productId);

        if (foundProduct) {
            setProduct(foundProduct);
            setLoading(false);
            document.title = `${foundProduct.title} | E-commerce`;
            
            // Track if this product has been viewed in this session
            const viewedProducts = JSON.parse(sessionStorage.getItem('viewedProducts') || '{}');
            if (!viewedProducts[productId]) {
                // Only increment view if this is the first time viewing in this session
                incrementProductView(productId);
                // Mark this product as viewed in this session
                viewedProducts[productId] = true;
                sessionStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
            }
        } else {
            // Product not found, redirect to homepage
            navigate("/");
        }
    }, [id, navigate, incrementProductView]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Nav />
                <div className="flex justify-center items-center h-[80vh]">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Nav />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Product image - on top for mobile, on right for larger screens */}
                        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 order-first">
                            <div className="relative w-full h-96">
                                {!imageLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                                <img
                                    src={product.img}
                                    alt={product.title}
                                    className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setImageLoaded(true)}
                                />
                            </div>
                        </div>

                        {/* Product details - below the image for mobile, on left for larger screens */}
                        <div className="w-full md:w-1/2 p-8 order-last md:order-first">
                            <button
                                onClick={() => navigate(-1)}
                                className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Back
                            </button>

                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>

                            <div className="flex items-center mb-4">
                                <span className="flex text-yellow-400">
                                    {product.star} {product.star} {product.star} {product.star}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">{product.reviews}</span>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center mb-2">
                                    <span className="text-lg text-gray-500 line-through mr-2">{product.prevPrice}</span>
                                    <span className="text-2xl font-bold text-blue-600">${product.newPrice}</span>
                                </div>
                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">In Stock</span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Product Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Brand:</span> {product.company}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Category:</span> {product.category}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Color:</span> {product.color}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Views:</span> {getProductViews(product.id)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {product.comments && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">Customer Reviews</h3>
                                    <div className="space-y-3">
                                        {product.comments.map((comment, index) => (
                                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                                <p className="font-medium text-gray-800">{comment.name}</p>
                                                <p className="text-gray-600">{comment.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition duration-200"
                                onClick={() => addToCart(product)}
                            >
                                <BsFillBagFill className="mr-2" /> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
