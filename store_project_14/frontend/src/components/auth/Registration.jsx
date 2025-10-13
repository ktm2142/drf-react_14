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
    <>
    <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">register</button>
      </form>
    </>
  );
};

export default Registration
