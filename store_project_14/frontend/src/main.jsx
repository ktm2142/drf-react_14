import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { SearchFilterProvider } from "./contexts/SearchFilterContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SearchFilterProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SearchFilterProvider>
  </BrowserRouter>
);
