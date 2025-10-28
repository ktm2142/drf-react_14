import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { OrderContext } from "../../contexts/OrderContext";

const OrderHistory = () => {
  const { authenticated } = useContext(AuthContext);
  const { orders, fetchOrderHistory } = useContext(OrderContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  useEffect(() => {
    if (authenticated) {
      fetchOrderHistory();
    }
  }, [authenticated]);

  return (
    <>
      {orders?.results ? (
        <>
          <div className="orders-grid">
            {orders.results.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Order ID: {order.id}</span>
                  <span className="order-date">
                    {formatDate(order.created_at)}
                  </span>
                </div>
                <div className="order-meta">
                  <span>Status: {order.status}</span>
                  <span className="order-total">Total: {order.total}$</span>
                </div>

                <ul className="order-items">
                  {order.order_items.map((item) => (
                    <li key={item.id} className="order-item">
                      <span className="item-name">{item.product.name}</span>
                      <span className="item-qty-price">
                        {item.price}$ x {item.quantity} ={" "}
                        <strong>{item.total_price}$</strong>
                      </span>
                    </li>
                  ))}
                </ul>
                <p>Total: {order.total}$</p>
              </div>
            ))}
          </div>
          <div className="pagination">
            {orders.previous && (
              <button onClick={() => fetchOrderHistory(orders.previous)}>
                Previous
              </button>
            )}
            {orders.next && (
              <button onClick={() => fetchOrderHistory(orders.next)}>
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <p>You have no pending or completed orders yet</p>
      )}
    </>
  );
};

export default OrderHistory;
