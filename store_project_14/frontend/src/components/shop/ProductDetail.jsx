import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicApiClient } from "../../api";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const fetchProduct = async () => {
    try {
      const response = await publicApiClient.get(`shop/product/${id}/`);
      setProduct(response.data);
    } catch (error) {
      console.error("error in fetchProduct", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) return <p>Loading</p>;

  return (
    <>
      <h5>{product.name}</h5>
      <p><strong>{product.price}</strong></p>
      <p>{product.description}</p>
    </>
  );
};

export default ProductDetail
