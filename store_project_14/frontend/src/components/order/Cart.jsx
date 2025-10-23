import { useContext, useEffect } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { fetchOrder, deleteOrder, orderData, updateItemQuantity, deleteItem } =
    useContext(OrderContext);
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleIncreaseQuantity = (item) => {
    updateItemQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateItemQuantity(item.id, item.quantity - 1);
    } else {
      if (window.confirm("You sure you want to delete item")) {
        deleteItem(item.id);
      }
    }
  };

  const handleDeleteItem = (item) => {
    if (window.confirm("You sure you want to delete item")) {
      deleteItem(item.id);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchOrder();
    }
  }, [authenticated]);

  const handleDeleteOrder = () => {
    if (window.confirm("Are you sure you want delete all items?")) {
      deleteOrder();
    }
  };

  return (
    <>
      <h1>Your cart</h1>

      <button onClick={() => navigate("/order_history")}>Order history</button>

      {!orderData?.order_items ? (
        <p>No items in cart</p>
      ) : (
        <div>
          <ul>
            {orderData?.order_items?.map((item) => (
              <li key={item.id}>
                <Link to={`/product/${item.product.id}`}>
                  <p>{item.product.name}</p>
                </Link>
                <p>{item.product.price}</p>
                <p>
                  {item.quantity} pcs. total price: {item.total_price}$
                </p>
                <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                <button onClick={() => handleDeleteItem(item)}>x</button>
              </li>
            ))}
          </ul>
          <p>Total: {orderData.total}$</p>
          <button onClick={() => navigate("/submit_order")}>
            Complete order
          </button>
          <button onClick={handleDeleteOrder}>Delete order</button>
        </div>
      )}
    </>
  );
};

export default Cart;
