import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const SubmitOrder = () => {
  const { submitOrder } = useContext(OrderContext);
  const { user, authenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        phoneNumber: user.phone_number || "",
        city: user.city || "",
        address: user.address || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!authenticated) {
      return navigate("/");
    }
  }, [authenticated]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!user) return <p>Loading your data</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitOrder({
      fisrt_name: form.firstName,
      last_name: form.lastName,
      phone_number: form.phoneNumber,
      city: form.city,
      address: form.address,
    });
    navigate("/");
  };

  return (
    <>
      <div className="form-card">
        <h1 className="form-title">Submit order</h1>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Your first name"
          />
          <br />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Your last name"
          />
          <br />
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Your phone number"
          />
          <br />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City you live"
          />
          <br />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Your address"
          />
          <br />
          <div className="form-actions">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SubmitOrder;
