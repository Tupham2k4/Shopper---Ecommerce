import React, { useEffect, useState } from "react";
import "./OrderList.css";

const OrderList = () => {
  const [allOrders, setAllOrders] = useState([]);

  const fetchOrders = async () => {
    await fetch("http://localhost:4000/allorders")
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#ff9800";
      case "completed":
        return "#4caf50";
      case "cancelled":
        return "#f44336";
      default:
        return "#454545";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <div className="order-list">
      <h1>Danh Sách Đơn Hàng</h1>
      <div className="order-list-container">
        {allOrders.length === 0 ? (
          <div className="no-orders">
            <p>Chưa có đơn hàng nào</p>
          </div>
        ) : (
          <div className="orders-table">
            <div className="order-header">
              <p className="order-id-header">Mã Đơn</p>
              <p className="order-customer-header">Khách Hàng</p>
              <p className="order-items-header">Sản Phẩm</p>
              <p className="order-total-header">Tổng Tiền</p>
              <p className="order-payment-header">Thanh Toán</p>
              <p className="order-status-header">Trạng Thái</p>
              <p className="order-date-header">Ngày Đặt</p>
            </div>
            <hr />
            <div className="orders-body">
              {allOrders.map((order, index) => (
                <React.Fragment key={order._id || index}>
                  <div className="order-row">
                    <p className="order-id">#{order._id?.slice(-8) || "N/A"}</p>
                    <div className="order-customer">
                      <p className="customer-name">{order.fullName}</p>
                      <p className="customer-email">{order.email}</p>
                      <p className="customer-address">{order.address}</p>
                    </div>
                    <div className="order-items">
                      {order.items && order.items.length > 0 ? (
                        <div className="items-list">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="item-preview">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="item-image"
                              />
                              <span className="item-name">
                                {item.name} x{item.quantity}
                              </span>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <p className="more-items">
                              +{order.items.length - 3} sản phẩm khác
                            </p>
                          )}
                        </div>
                      ) : (
                        <p>Không có sản phẩm</p>
                      )}
                    </div>
                    <p className="order-total">${order.totalAmount}</p>
                    <p className="order-payment">
                      {order.paymentMethod === "cash"
                        ? "Tiền Mặt"
                        : "Chuyển Khoản"}
                    </p>
                    <p
                      className="order-status"
                      style={{ color: getStatusColor(order.status) }}
                    >
                      {getStatusText(order.status)}
                    </p>
                    <p className="order-date">{formatDate(order.date)}</p>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
