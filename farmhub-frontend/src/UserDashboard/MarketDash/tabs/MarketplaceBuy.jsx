import React, { useState, useEffect } from "react";
import ProductCard from "../../../website/Components/marketplace/ProductCard";
import FilterSidebar from "../../../website/Components/marketplace/FilterMarket";
import { produceAPI } from "../../../utils/api";
import CheckoutPage from "../CheckoutPage";
import PaymentPage from "./PaymentPage";
import ConfirmationPage from "./ConfirmPage"; // Import the confirmation page

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await produceAPI.getAll();
      setProducts(data || []);
      // Update price range based on actual products
      if (data && data.length > 0) {
        const maxPrice = Math.max(...data.map(p => p.price || 0));
        setPriceRange([0, maxPrice || 100000]);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const [currentStep, setCurrentStep] = useState("marketplace"); // marketplace, checkout, payment, confirmation
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentData, setPaymentData] = useState(null); // Store payment info

  // Get unique categories from products
  const uniqueCategories = ["All Categories", ...new Set(products.map(p => p.category).filter(Boolean))];
  const categories = uniqueCategories.map(cat => ({
    name: cat,
    count: cat === "All Categories" ? products.length : products.filter(p => p.category === cat).length
  }));

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesPrice = (product.price || 0) <= priceRange[1] && (product.price || 0) >= priceRange[0];
    // Note: Rating filtering removed as API may not have ratings
    return matchesCategory && matchesPrice;
  });

  const handleReset = () => {
    setSelectedCategory("All Categories");
    const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price || 0)) : 100000;
    setPriceRange([0, maxPrice]);
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
          {loading ? (
            <p className="col-span-full text-center text-gray-500 mt-10">
              Loading products...
            </p>
          ) : filteredProducts.length === 0 ? (
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