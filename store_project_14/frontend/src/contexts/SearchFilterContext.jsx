import { createContext, useEffect, useState } from "react";
import { publicApiClient } from "../api";

export const SearchFilterContext = createContext();

export const SearchFilterProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  // Getting category ID or URL
  const performFiltration = async (categoryOrURL) => {

    let response;
    try {
      if (categoryOrURL.startsWith("http")) {
        response = await publicApiClient.get(categoryOrURL);
      } else {
        const params = new URLSearchParams();
        params.append("category", categoryOrURL);
        response = await publicApiClient.get("shop/search_filter/", { params });
      }
      setProducts(response.data);
    } catch (error) {
      console.error("error in performFilter", error);
    }
  };

  const performSearch = async (query) => {
    try {
      const params = new URLSearchParams();
      params.append("query", query);
      const response = await publicApiClient.get("shop/search_filter/", {
        params,
      });
      setProducts(response.data.results);
    } catch (error) {
      console.error("error in performSearch", error);
    }
  };

  return (
    <SearchFilterContext.Provider
      value={{ performFiltration, performSearch, products, setProducts }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};
