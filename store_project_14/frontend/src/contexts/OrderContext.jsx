import { createContext, useContext, useEffect, useState } from "react";
import { privateApiClient } from "../api";
import { useNavigate } from "react-router-dom";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState(null);
  const [orders, setOrders] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [message, setMessage] = useState("");
  // const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const response = await privateApiClient.get("order/retrieve/");
      setOrderData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setOrderData(null);
      } else {
        console.error("error in fetchOrder", error);
      }
    }
  };

  const submitOrder = async () => {
    try {
      await privateApiClient.patch("order/submit/");
      await fetchOrder();
    } catch (error) {
      console.error("error in submitOrder", error);
    }
  };

  const deleteOrder = async () => {
    try {
      await privateApiClient.delete("order/delete/");
      await fetchOrder();
    } catch (error) {
      console.error("error in deleteOrder", error);
    }
  };

  const fetchOrderHistory = async (url = null) => {
    try {
      const pageOrURL = url || "order/history/"
      const response = await privateApiClient.get(pageOrURL);
      setOrders(response.data);
    } catch (error) {
      console.error("error in fetchOrderHistory", error);
    }
  };

  const addItemInCart = async (itemId, quantity) => {
    try {
      await privateApiClient.post(`order/add_item/`, {
        product_id: itemId,
        quantity,
      });
      setMessage("Item added in cart")
      setErrMessage("")
    } catch (error) {
      if (error.response.data) {
        setMessage("")
        setErrMessage(error.response.data);
      }
      console.error("error in addItemInCart", error);
    }
  };

  const updateItemQuantity = async (itemId, quantity) => {
    try {
      await privateApiClient.patch(`order/update_delete/${itemId}/`, {
        quantity,
      });
      await fetchOrder();
    } catch (error) {
      console.error("error in updateItem", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await privateApiClient.delete(`order/update_delete/${itemId}/`);
      await fetchOrder();
    } catch (error) {
      console.error("error in deleteItem", error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orderData,
        errMessage,
        setErrMessage,
        message,
        setMessage,
        orders,
        fetchOrder,
        submitOrder,
        deleteOrder,
        fetchOrderHistory,
        addItemInCart,
        updateItemQuantity,
        deleteItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
