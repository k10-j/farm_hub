import React, { useState, useEffect } from "react";
import OrderItem from "../../DashComponents/marketplace/OrderItem";
import { ordersAPI } from "../../../utils/api";

const MarketplaceOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersAPI.getMyOrders();
      // Transform API data to match OrderItem component expectations
      const transformedOrders = data.map(order => ({
        id: order.id,
        product: order.produce?.name || order.productName || "Product",
        price: order.totalAmount || order.price || 0,
        status: order.status || "PENDING",
        date: order.createdAt || order.orderDate || new Date().toISOString()
      }));
      setOrders(transformedOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        orders.map((o) => (
          <OrderItem key={o.id} order={o} />
        ))
      )}
    </div>
  );
};

export default MarketplaceOrders;
