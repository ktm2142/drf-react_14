import { createContext, useEffect, useState } from "react";
import { publicApiClient } from "../api";

export const SearchFilterContext = createContext();

export const SearchFilterProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  // Filtering products by category
  // Getting category ID or URL. Backend pagination give us URL we can use
  const performFiltration = async (categoryOrURL) => {
    let response;
    try {
      // If a URL is passed (for pagination), we use it directly
      if (categoryOrURL.startsWith("http")) {
        response = await publicApiClient.get(categoryOrURL);
      }
      // Otherwise, make a query with the category parameter
      else {
        response = await publicApiClient.get("shop/search_filter/", {
          params: { category: categoryOrURL },
        });
      }
      setProducts(response.data);
    } catch (error) {
      console.error("error in performFilter", error);
    }
  };

  // getting search query or URL. Backend pagination give us URL we can use
  const performSearch = async (queryOrURL) => {
    let response;
    try {
      // If a URL is passed (for pagination), we use it directly
      if (queryOrURL.startsWith("http")) {
        response = await publicApiClient.get(queryOrURL);
      }
      // Otherwise, make a query with the search parameter
      else {
        response = await publicApiClient.get("shop/search_filter/", {
          params: { search: queryOrURL },
        });
      }
      setProducts(response.data);
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
