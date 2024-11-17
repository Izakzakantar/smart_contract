import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    user_type: "Donor",
  });

  const [responseMessage, setResponseMessage] = useState(""); 
  const navigate = useNavigate(); // React Router navigation function

  const sanitizeInput = (value) => {
    return DOMPurify.sanitize(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     try {
      const response = await fetch("http://localhost:1234/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      console.log(response);
      const result = await response.json();
      
  
      if (response.ok) {
        console.log("Registration successful:", result);
        navigate("/dashboard");
      } else {
        setResponseMessage(`Error: ${result.message || "Something went wrong!"}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };
  
  

  return (
    <div className="signup-container">
      <header className="signup-header">
        <h1>Sign up</h1>
        <p>Sign up to enjoy the feature of Revolut</p>
      </header>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user_type">User Type</label>
          <select
            id="user_type"
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
          >
            <option value="Donor">Donor</option>
            <option value="Beneficiary">Beneficiary</option>
          </select>
        </div>

        <button type="submit" className="signup-button">
          Sign up
        </button>
      </form>

      {/* Display error messages */}
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default Signup;
