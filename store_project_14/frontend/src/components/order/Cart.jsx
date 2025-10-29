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
      <div className="cart-grid">

        <button onClick={() => navigate("/order_history")}>
          Order history
        </button>

        {!orderData?.order_items ? (
          <p>No items in cart</p>
        ) : (
          <>
            {orderData?.order_items?.map((item) => (
              <div key={item.id} className="card card-item">
                <Link to={`/product/${item.product.id}`}>
                  <p>{item.product.name}</p>
                </Link>
                <div>
                  <span>{item.product.price}$</span>
                  <span>x{item.quantity}</span>
                  <strong>= {item.total_price}</strong>
                </div>
                <div className="qty-controls">
                  <button onClick={() => handleIncreaseQuantity(item)}>
                    +
                  </button>
                  <span className="qty">{item.quantity}</span>
                  <button onClick={() => handleDecreaseQuantity(item)}>
                    -
                  </button>
                  <button onClick={() => handleDeleteItem(item)}>x</button>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <p className="total">Total: {orderData.total}$</p>
              <div className="cart-actions">
                <button onClick={() => navigate("/submit_order")}>
                  Complete order
                </button>
                <button onClick={handleDeleteOrder} className="danger">
                  Delete order
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
