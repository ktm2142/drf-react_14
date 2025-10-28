import { useContext, useEffect, useState } from "react";
import { SearchFilterContext } from "../../contexts/SearchFilterContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const { performSearch, products } = useContext(SearchFilterContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // text handler in search input
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  //   search handler changes URL
  const applySearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  //   We listen to URL and trigger search only if it changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("query");
    if (searchParam) {
      setQuery(searchParam);
      performSearch(searchParam);
    }
  }, [location.search]);

  return (
    <>
      <form onSubmit={applySearch}>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>
      <div className="category-grid">
        {products?.results.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="card">
            <p>{product.name}</p>
            <p className="price">{product.price}</p>
          </Link>
        ))}
      </div>
      <div className="pagination">
        {products?.previous && (
          <button onClick={() => performSearch(products.previous)}>
            Prevoius
          </button>
        )}
        {products?.next && (
          <button onClick={() => performSearch(products.next)}>Next</button>
        )}
      </div>
    </>
  );
};

export default Search;
