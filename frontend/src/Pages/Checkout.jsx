import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/Checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, all_product, getTotalCartAmount, clearCart } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    paymentMethod: "cash",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.fullName || !formData.email || !formData.address) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Prepare order items
    const orderItems = cartProducts.map((product) => ({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.new_price,
      quantity: cartItems[product.id],
      total: product.new_price * cartItems[product.id],
    }));

    // Get user ID if logged in
    let userId = "guest";
    try {
      const token = localStorage.getItem("auth-token");
      if (token) {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        userId = decoded.user?.id || "guest";
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      userId = "guest";
    }

    // Place order
    try {
      await fetch("http://localhost:4000/placeorder", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          fullName: formData.fullName,
          email: formData.email,
          address: formData.address,
          paymentMethod: formData.paymentMethod,
          items: orderItems,
          totalAmount: getTotalCartAmount(),
        }),
      });
    } catch (error) {
      console.error("Error placing order:", error);
    }

    // Clear cart after successful checkout
    clearCart();

    // Show success notification
    setShowSuccess(true);

    // Hide success notification after 3 seconds and redirect
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 3000);
  };

  // Get cart items for display
  const cartProducts = all_product.filter(
    (product) => cartItems[product.id] > 0
  );

  return (
    <div className="checkout">
      <div className="checkout-container">
        <h1>Thanh Toán</h1>

        <div className="checkout-content">
          {/* Left side - Customer Information */}
          <div className="checkout-form-section">
            <h2>Thông Tin Khách Hàng</h2>
            <form onSubmit={handleSubmit}>
              <div className="checkout-fields">
                <div className="checkout-field">
                  <label>Họ và Tên *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập địa chỉ email"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>Địa Chỉ Nhận Hàng *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Nhập địa chỉ nhận hàng"
                    rows="4"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>Phương Thức Thanh Toán *</label>
                  <div className="payment-methods">
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={handleInputChange}
                      />
                      <span>Tiền Mặt</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={handleInputChange}
                      />
                      <span>Thanh Toán Qua Tài Khoản Ngân Hàng</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="checkout-button">
                  Xác Nhận Thanh Toán
                </button>
              </div>
            </form>
          </div>

          {/* Right side - Order Summary */}
          <div className="checkout-summary-section">
            <h2>Tóm Tắt Đơn Hàng</h2>
            <div className="checkout-summary">
              <div className="checkout-products">
                {cartProducts.map((product) => (
                  <div key={product.id} className="checkout-product-item">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="checkout-product-image"
                    />
                    <div className="checkout-product-details">
                      <p className="checkout-product-name">{product.name}</p>
                      <p className="checkout-product-price">
                        ${product.new_price} x {cartItems[product.id]}
                      </p>
                    </div>
                    <p className="checkout-product-total">
                      ${product.new_price * cartItems[product.id]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="checkout-total">
                <div className="checkout-total-item">
                  <p>Tạm Tính</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <div className="checkout-total-item">
                  <p>Phí Vận Chuyển</p>
                  <p>Miễn Phí</p>
                </div>
                <hr />
                <div className="checkout-total-item checkout-total-final">
                  <h3>Tổng Cộng</h3>
                  <h3>${getTotalCartAmount()}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Notification */}
        {showSuccess && (
          <div className="checkout-success-overlay">
            <div className="checkout-success-modal">
              <div className="checkout-success-icon">✓</div>
              <h2>Thanh Toán Thành Công!</h2>
              <p>Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đã được xử lý.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
