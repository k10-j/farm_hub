import React, { useState } from "react";
import ProductCard from "../../../website/Components/marketplace/ProductCard";
import FilterSidebar from "../../../website/Components/marketplace/FilterMarket";
import products from "../../../website/Components/marketplace/ProductData"; 
import CheckoutPage from "../CheckoutPage";
import PaymentPage from "./PaymentPage";
import ConfirmationPage from "./ConfirmPage"; // Import the confirmation page

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, Math.max(...products.map(p => p.price))]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const [currentStep, setCurrentStep] = useState("marketplace"); // marketplace, checkout, payment, confirmation
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentData, setPaymentData] = useState(null); // Store payment info

  const categories = [
    { name: "All Categories", count: products.length },
    { name: "Vegetables", count: products.filter(p => p.category === "Vegetables").length },
    { name: "Fruits", count: products.filter(p => p.category === "Fruits").length },
    { name: "Grains", count: products.filter(p => p.category === "Grains").length },
    { name: "Equipment", count: products.filter(p => p.category === "Equipment").length },
    { name: "Seeds", count: products.filter(p => p.category === "Seeds").length },
    { name: "Livestock", count: products.filter(p => p.category === "Livestock").length },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange[1];
    const matchesRating = selectedRatings.length === 0 || selectedRatings.some(r => product.rating >= r);
    return matchesCategory && matchesPrice && matchesRating;
  });

  const handleReset = () => {
    setSelectedCategory("All Categories");
    setPriceRange([0, Math.max(...products.map(p => p.price))]);
    setSelectedRatings([]);
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setCurrentStep("checkout");
    window.scrollTo(0, 0);
  };

  const handleProceedToPayment = (info) => {
    setShippingInfo(info);
    setCurrentStep("payment");
    window.scrollTo(0, 0);
  };

  const handleBackToCheckout = () => {
    setCurrentStep("checkout");
    window.scrollTo(0, 0);
  };

  const handlePaymentSuccess = (payment) => {
    setPaymentData(payment);
    setCurrentStep("confirmation");
    window.scrollTo(0, 0);
  };

  const handleContinueShopping = () => {
    setSelectedProduct(null);
    setShippingInfo(null);
    setPaymentData(null);
    setCurrentStep("marketplace");
    window.scrollTo(0, 0);
  };

  // Render Checkout Page
  if (currentStep === "checkout" && selectedProduct) {
    return (
      <CheckoutPage
        product={selectedProduct}
        onBack={handleContinueShopping}
        onProceedToPayment={handleProceedToPayment}
      />
    );
  }

  // Render Payment Page
  if (currentStep === "payment" && selectedProduct && shippingInfo) {
    return (
      <PaymentPage
        product={selectedProduct}
        shippingInfo={shippingInfo}
        onBackToCheckout={handleBackToCheckout}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  // Render Confirmation Page
  if (currentStep === "confirmation" && selectedProduct && shippingInfo) {
    return (
      <ConfirmationPage
        product={selectedProduct}
        shippingInfo={shippingInfo}
        paymentData={paymentData}
        onBackToHome={handleContinueShopping}
      />
    );
  }

  // Marketplace view (Product Listing)
  return (
    <div className="min-h-screen font-sanserif bg-gray-50">
      <div className="lg:hidden flex justify-end px-6 mb-4">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="py-2 px-4 bg-green-600 text-white rounded-lg"
        >
          {showSidebar ? "Close Filters" : "Filters"}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex gap-6">
        {showSidebar && (
          <FilterSidebar
            categories={categories.map(c => ({ ...c, selected: c.name === selectedCategory }))}
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPriceRange}
            onRatingChange={setSelectedRatings}
            onReset={handleReset}
          />
        )}

        <div className="hidden lg:block">
          <FilterSidebar
            categories={categories.map(c => ({ ...c, selected: c.name === selectedCategory }))}
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPriceRange}
            onRatingChange={setSelectedRatings}
            onReset={handleReset}
          />
        </div>

        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 gap-5">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No products match your filters.
            </p>
          ) : (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onBuyNow={() => handleBuyNow(product)}
              />
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default Marketplace;