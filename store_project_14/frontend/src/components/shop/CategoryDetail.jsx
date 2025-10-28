import { useEffect, useState } from "react";
import { publicApiClient } from "../../api";
import { Link, useParams } from "react-router-dom";

const CategoryDetail = () => {
  const [products, setProducts] = useState(null);
  const { id } = useParams();

  const fetchProducts = async (url = null) => {
    try {
      const pageOrUrl = url || `shop/category/${id}/`;
      const response = await publicApiClient.get(pageOrUrl);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
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
          <button onClick={() => fetchProducts(products.previous)}>
            Previous
          </button>
        )}
        {products?.next && (
          <button onClick={() => fetchProducts(products.next)}>Next</button>
        )}
      </div>
    </>
  );
};

export default CategoryDetail;
