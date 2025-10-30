import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // In a real app, you'd have an endpoint to fetch orders
      // For now, we'll just show the orders we create
      console.log("Orders fetched");
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:4000/order", {
        userId: formData.userId,
        amount: parseFloat(formData.amount),
      });

      const newOrder = {
        ...response.data.order,
        timestamp: new Date().toLocaleString(),
        status: "Processing...",
      };

      setOrders((prev) => [newOrder, ...prev]);
      setMessage(
        `✅ Order created successfully! Order ID: ${newOrder.orderId}`
      );

      // Clear form
      setFormData({ userId: "", amount: "" });

      // Simulate payment processing status update
      setTimeout(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.orderId === newOrder.orderId
              ? { ...order, status: "Payment Processed ✅" }
              : order
          )
        );
        setMessage(`💰 Payment processed for Order ID: ${newOrder.orderId}`);
      }, 3000);
    } catch (error) {
      console.error("Error creating order:", error);
      setMessage("❌ Error creating order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Kafka Demo - Order Management</h1>
        <p>Create orders and watch them flow through Kafka microservices!</p>
      </header>

      <main className="App-main">
        <div className="order-form-container">
          <h2>📝 Create New Order</h2>
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-group">
              <label htmlFor="userId">User ID:</label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                placeholder="Enter user ID (e.g., user123)"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount ($):</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount (e.g., 99.99)"
                step="0.01"
                min="0"
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "⏳ Creating Order..." : "🚀 Create Order"}
            </button>
          </form>

          {message && (
            <div
              className={`message ${
                message.includes("✅") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        <div className="orders-container">
          <h2>📋 Recent Orders</h2>
          {orders.length === 0 ? (
            <div className="no-orders">
              <p>No orders yet. Create your first order above!</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.orderId} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.orderId}</h3>
                    <span
                      className={`status ${
                        order.status.includes("✅") ? "completed" : "processing"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p>
                      <strong>User ID:</strong> {order.userId}
                    </p>
                    <p>
                      <strong>Amount:</strong> ${order.amount}
                    </p>
                    <p>
                      <strong>Created:</strong> {order.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <div className="flow-diagram">
          <h3>🔄 Order Processing Flow</h3>
          <div className="flow-steps">
            <div className="step">
              <div className="step-icon">📝</div>
              <p>Frontend</p>
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="step-icon">📦</div>
              <p>Order Service</p>
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="step-icon">⚡</div>
              <p>Kafka</p>
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="step-icon">💰</div>
              <p>Payment Service</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
