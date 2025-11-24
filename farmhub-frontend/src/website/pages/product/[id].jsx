import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../../Components/marketplace/ProductData";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../../hooks/cartHook";
import CheckoutPage from "../../../UserDashboard/MarketDash/CheckoutPage";
import PaymentPage from "../PaymentPage";
import OrderConfirmationPage from "../OrderConfirmationPage";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  const [currentStep, setCurrentStep] = useState('product'); // 'product', 'checkout', 'payment', 'confirmation'
  const [orderData, setOrderData] = useState(null);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Product not found.</p>
      </div>
    );
  }

  if (currentStep === 'checkout') {
    return (
      <CheckoutPage 
        product={{ ...product, quantity }}
        onBack={() => setCurrentStep('product')}
        onProceedToPayment={handleProceedToPayment}
      />
    );
  }

  if (currentStep === 'payment') {
    return (
      <PaymentPage 
        orderData={orderData}
        onBack={() => setCurrentStep('checkout')}
        onPaymentComplete={handlePaymentComplete}
      />
    );
  }

  if (currentStep === 'confirmation') {
    return (
      <OrderConfirmationPage 
        orderData={orderData}
        onContinueShopping={() => navigate('/marketplace')}
      />
    );
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400" />
        ))}
        {hasHalfStar && <Star className="w-5 h-5 fill-yellow-200" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-gray-300" />
        ))}
      </div>
    );
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);
  };

  const buyNow = () => {
    if (!product.inStock) return;
    setCurrentStep('checkout');
  };

  const handleProceedToPayment = (shippingInfo) => {
    const shippingCost = 5000;
    const tax = (product.price * shippingInfo.quantity) * 0.18;
    const subtotal = product.price * shippingInfo.quantity;
    const total = subtotal + shippingCost + tax;

    setOrderData({
      product,
      shippingInfo,
      subtotal,
      shipping: shippingCost,
      tax,
      total
    });
    setCurrentStep('payment');
  };

  const handlePaymentComplete = (paymentData) => {
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('marketplaceOrders') || '[]');
    const newOrder = {
      ...paymentData,
      id: Date.now(),
      date: new Date().toISOString(),
      product: product.name,
      status: 'CONFIRMED'
    };
    orders.push(newOrder);
    localStorage.setItem('marketplaceOrders', JSON.stringify(orders));
    
    setOrderData(paymentData);
    setCurrentStep('confirmation');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen mt-40 bg-gray-100 font-serif p-6 md:p-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left: Image Gallery */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-96 object-contain rounded-2xl shadow-md"
          />
          <div className="flex gap-4">
            {[product.image].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setMainImage(img)}
                className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-green-500"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            {/* Category & Badges */}
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              {product.category}
            </span>
            {product.isNew && (
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold ml-2">
                NEW
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold ml-2">
                -{product.discount}%
              </span>
            )}

            <h1 className="text-4xl font-extrabold mt-2 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              {renderStars(product.rating)}
              <span className="text-gray-600 text-sm">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <p className="text-5xl font-bold text-green-700">
                RWF {product.price.toLocaleString()}
              </p>
              {product.discount > 0 && (
                <p className="text-gray-500 line-through mt-1">
                  RWF {product.originalPrice.toLocaleString()}
                </p>
              )}
              <p className="text-gray-600 mt-1">{product.unit}</p>
            </div>

            {/* Seller Info */}
            <p className="text-gray-700">
              Sold by: <span className="text-green-600 font-semibold">{product.seller}</span>,{" "}
              {product.location}
            </p>
            <p className={`mt-2 font-semibold ${product.inStock ? "text-green-500" : "text-red-500"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            {product.sold > 0 && <p className="mt-1 text-gray-500 text-sm">{product.sold} sold recently</p>}

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="mt-4 flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row sm:gap-4 gap-4">
              <button
                className={`flex-1 py-3 rounded-lg font-bold text-white ${
                  product.inStock ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"
                } transition`}
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 inline mr-2" /> Add to Cart
              </button>
              <button
                className={`flex-1 py-3 rounded-lg font-bold ${
                  product.inStock
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition`}
                disabled={!product.inStock}
                onClick={buyNow}
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex border-b mb-4">
              {["description", "specs", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 font-medium ${
                    activeTab === tab ? "border-b-2 border-green-600 text-green-600" : "text-gray-500"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === "description" && <div className="text-gray-700">{product.description}</div>}
            {activeTab === "specs" && (
              <ul className="text-gray-700 list-disc pl-5">
                <li>Category: {product.category}</li>
                <li>Unit: {product.unit}</li>
                <li>Seller: {product.seller}</li>
                <li>Location: {product.location}</li>
                <li>In Stock: {product.inStock ? "Yes" : "No"}</li>
                <li>Sold: {product.sold}</li>
                <li>Discount: {product.discount}%</li>
              </ul>
            )}
            {activeTab === "reviews" && (
              <div className="text-gray-700 space-y-4">
                <p>★★★★☆ "Great product!" — Jane Doe</p>
                <p>★★★★★ "Highly recommended!" — John Smith</p>
                <p className="text-sm text-gray-500">And {product.reviews} more reviews...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6">You may also Like these Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4"
              >
                <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-lg mb-2" />
                <h3 className="text-gray-800 font-semibold">{p.name}</h3>
                <p className="text-green-600 font-bold">RWF {p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
