import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { publicApiClient } from "../../api";
import { OrderContext } from "../../contexts/OrderContext";
import { AuthContext } from "../../contexts/AuthContext";

const ProductDetail = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItemInCart, message } = useContext(OrderContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await publicApiClient.get(`shop/product/${id}/`);
      setProduct(response.data);
    } catch (error) {
      console.error("error in fetchProduct", error);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
    }
    addItemInCart(product.id, quantity);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) return <p>Loading</p>;

  return (
    <>
      <div>
        <h5>{product.name}</h5>
        <p>
          <strong>{product.price}</strong>
        </p>
        <p>{product.description}</p>
        <input
          type="number"
          min="1"
          max="10"
          step="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>
      {message && (
        <p>{typeof message === "object" ? message.quantity?.[0] : message}</p>
      )}
    </>
  );
};

export default ProductDetail;
