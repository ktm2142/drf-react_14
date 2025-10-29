import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Registration = () => {
  const { registration } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registration({
      username: form.username,
      password: form.password,
      password_2: form.confirmPassword,
    });
  };

  return (
    <div className="form-card">
    <h1 className="form-title">Registration</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
        />
        <div className="form-actions">
        <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Registration
