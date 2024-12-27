import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import ReCAPTCHA from "react-google-recaptcha";

function Signup() {
  const sitekey = process.env.REACT_APP_SITE_KEY;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    user_type: "Donor",
  });
  const [captchaToken, setCaptchaToken] = useState(""); // To store reCAPTCHA token
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate(); // React Router navigation function

  // Sanitize user input
  const sanitizeInput = (value) => {
    return DOMPurify.sanitize(value);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  // Handle reCAPTCHA token
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setResponseMessage("Please complete the reCaptcha challenge");
      return;
    }

    try {
      // Register the user
      const registerResponse = await fetch("http://localhost:1234/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, captchaToken }),
        credentials: "include",
      });

      const registerResult = await registerResponse.json();

      if (registerResponse.ok) {
        console.log("Registration successful:", registerResult);

        // Send email for verification
        const emailResponse = await fetch("http://localhost:1234/api/v1/email-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: "anonyyme64@gmail.com" }), // Send the email
        });

        const emailResult = await emailResponse.json();

        if (emailResponse.ok) {
          console.log("Email sent for verification:", emailResult);
          setResponseMessage("Verification email sent! Please check your inbox.");
          navigate("/dashboard"); // Redirect to email verification page
        } else {
          setResponseMessage(`Error sending email: ${emailResult.message || "Something went wrong!"}`);
        }
      } else {
        setResponseMessage(`Error: ${registerResult.message || "Something went wrong during registration!"}`);
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

        <div>
          <ReCAPTCHA
            className="reCAPTCHA-class"
            sitekey={sitekey}
            onChange={handleCaptchaChange}
          />
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
