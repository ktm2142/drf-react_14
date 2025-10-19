import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchFilterContext } from "../../contexts/SearchFilterContext";
import { publicApiClient } from "../../api";

const Filter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { performFiltration, products, setProducts } =
    useContext(SearchFilterContext);
  const [categoryList, setCategoryList] = useState(null); // here we place category list to choose from
  const [selectedCategory, setSelectedCategory] = useState(""); // here we place category for filtration

  useEffect(() => {
    // loading categories in dropdown list
    const loadCategories = async () => {
      try {
        const response = await publicApiClient.get("shop/categories/");
        setCategoryList(response.data);
      } catch (error) {
        console.error("Error in loadCategories", error);
      }
    };
    loadCategories();
  }, []);

  // Category change handler: reads the value from the <option> and updates category name in <select>
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Basically we only change URL with selected category
  const applyFilter = (e) => {
    e.preventDefault();
    navigate(`/filter?category=${encodeURIComponent(selectedCategory)}`);
  };

  // We listen URL and perform filtration when it changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      performFiltration(categoryParam);
    } else {
      setSelectedCategory("");
      setProducts(null);
    }
  }, [location.search]);

  if (!categoryList) return <p>Loading categories</p>;

  return (
    <>
      <div>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="" disabled>
            Choose category
          </option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={applyFilter}>Apply filter</button>
      </div>
      <div>
        <ul>
          {products?.results?.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}><p>{product.name}</p></Link>
              <p>{product.price}</p>
            </li>
          ))}
        </ul>
        {products?.previous && (
          <button onClick={() => performFiltration(products.previous)}>Previous</button>
        )}
        {products?.next && (
          <button onClick={() => performFiltration(products.next)}>Next</button>
        )}
      </div>
    </>
  );
};

export default Filter;
