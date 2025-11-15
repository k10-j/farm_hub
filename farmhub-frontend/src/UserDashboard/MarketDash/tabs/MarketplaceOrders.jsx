import React from "react";
import OrderItem from "../../DashComponents/marketplace/OrderItem";

const orders = [
  { id: 1, product: "Tomatoes 5kg", price: 6000, status: "Delivered", date: "Jan 20" },
  { id: 2, product: "Fertilizer NPK", price: 23000, status: "Pending", date: "Jan 25" }
];

const MarketplaceOrders = () => {
  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <OrderItem key={o.id} order={o} />
      ))}
    </div>
  );
};

export default MarketplaceOrders;
