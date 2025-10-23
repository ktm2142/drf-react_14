import { useContext, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import UserProfile from "./components/user/UserProfile";
import CategoryList from "./components/shop/CategoryList";
import CategoryDetail from "./components/shop/CategoryDetail";
import ProductDetail from "./components/shop/ProductDetail";
import Filter from "./components/search_filter/Filter";
import Search from "./components/search_filter/Search";
import Cart from "./components/order/Cart";
import SubmitOrder from "./components/order/SubmitOrder";
import OrderHistory from "./components/order/OrderHistory";

function App() {
  const { logout, user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const mainPage = pathname === "/";
  const registrationPage = pathname === "/registration";
  const loginPage = pathname === "/login";
  const userProfilePage = pathname === "/profile";
  const cartPage = pathname === "/cart";

  return (
    <>
      <h1>E-commerce DRF+React 14-th project</h1>
      {!mainPage && <button onClick={() => navigate("/")}>To main page</button>}

      {!user ? (
        <>
          <button
            onClick={() =>
              registrationPage ? navigate("/") : navigate("/registration")
            }
          >
            {registrationPage ? "Close" : "Registration"}
          </button>
          <button
            onClick={() => (loginPage ? navigate("/") : navigate("login"))}
          >
            {loginPage ? "Close" : "Login"}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() =>
              userProfilePage ? navigate("/") : navigate("/profile")
            }
          >
            {userProfilePage ? "Close" : user.username}
          </button>
          <button
            onClick={() => (cartPage ? navigate("/") : navigate("/cart"))}
          >
            {cartPage ? "Close" : "Cart"}
          </button>
          <button onClick={logout}>Logout</button>
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <CategoryList />
              <Filter />
              <Search />
            </>
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/category_detail/:id/" element={<CategoryDetail />} />
        <Route path="/product/:id/" element={<ProductDetail />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/submit_order" element={<SubmitOrder />} />
        <Route path="/order_history" element={<OrderHistory />} />
      </Routes>
    </>
  );
}

export default App;
