import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const UserProfile = () => {
  const { user, updateUserData, authenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
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

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData({
      first_name: form.firstName,
      last_name: form.lastName,
      phone_number: form.phoneNumber,
      city: form.city,
      address: form.address,
    });
    setEdit(false);
  };

  const toggleCancelButton = (
    <button type="button" onClick={() => setEdit((prev) => !prev)}>
        {edit ? "Cancel" : "Edit"}
      </button>
  )

  useEffect(() => {
    if (!authenticated) {
      return navigate("/");
    }
  }, [authenticated]);

  if (!user) return <p>Loading your data</p>;

  return (
    <>
      <div className="form-card">
        <h1 className="form-title">Hello {user.username}!</h1>

        {edit ? (
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
              {toggleCancelButton}
            </div>
          </form>
        ) : (
          <>
            <p>Name: {user.first_name}</p>
            <p>Last name: {user.last_name}</p>
            <p>Phone number: {user.phone_number}</p>
            <p>City: {user.city}</p>
            <p>Address: {user.address}</p>
            <div className="form-actions">
            {toggleCancelButton}
            </div>
          </>
        )}
      </div>
      
    </>
  );
};

export default UserProfile;
