import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    login({
        username: form.username,
        password: form.password
    })
  }

  return (
    <>  
    <h1>Login</h1>
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
            <button type="submit">login</button>
        </form>
    </>
  )
};

export default Login
