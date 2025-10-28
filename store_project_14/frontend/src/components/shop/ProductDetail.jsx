import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { publicApiClient } from "../../api";
import { OrderContext } from "../../contexts/OrderContext";
import { AuthContext } from "../../contexts/AuthContext";

const ProductDetail = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItemInCart, errMessage, setErrMessage, message, setMessage } =
    useContext(OrderContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await publicApiClient.get(`shop/product/${id}/`);
      setProduct(response.data);
      setErrMessage("");
      setMessage("")
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
      <div className="product-detail">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">
          <strong>{product.price}</strong>
        </p>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
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
      </div>
      {message && <p className="error-text">{message}</p>}
      {errMessage && <p className="error-text">{errMessage.quantity?.[0]}</p>}
    </>
  );
};

export default ProductDetail;
