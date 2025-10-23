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
        <ul>
          {orders.results.map((order) => (
            <li key={order.id}>
              <hr />

              <p>
                Order {order.id} from {formatDate(order.created_at)}
              </p>
              <p>{order.status}</p>
              <p>Items:</p>
              <ul>
                {order.order_items.map((item) => (
                  <li key={item.id}>
                    <p>{item.name}</p>
                    <p>
                      {item.price} pcs for {item.total_price}
                    </p>
                  </li>
                ))}
              </ul>
              <br />
              <p>Total: {order.total}</p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no pending or completed orders yet</p>
      )}
    </>
  );
};

export default OrderHistory;
