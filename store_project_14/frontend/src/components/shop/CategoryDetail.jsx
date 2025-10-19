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
      <ul>
        {products?.results.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <p>{product.name}</p>
            </Link>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
      {products?.previous && (
        <button onClick={() => fetchProducts(products.previous)}>
          Previous
        </button>
      )}
      {products?.next && (
        <button onClick={() => fetchProducts(products.next)}>Next</button>
      )}
    </>
  );
};

export default CategoryDetail;
