import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { SearchFilterProvider } from "./contexts/SearchFilterContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SearchFilterProvider>
      <AuthProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </AuthProvider>
    </SearchFilterProvider>
  </BrowserRouter>
);
