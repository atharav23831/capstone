import React, { useState } from "react";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch(window.location.origin + "/djangoapp/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  const fieldStyle = { display: "block", width: "100%", padding: "8px", marginBottom: "14px" };

  return (
    <div style={{ width: "40%", margin: "50px auto", padding: "24px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Sign Up</h2>
        <a href="/" onClick={gohome} style={{ textDecoration: "none", fontSize: "20px" }}>X</a>
      </div>
      <hr />
      <form onSubmit={register}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" name="username" placeholder="Username"
          style={fieldStyle} onChange={(e) => setUserName(e.target.value)} required />

        <label htmlFor="first_name">First Name</label>
        <input id="first_name" type="text" name="first_name" placeholder="First Name"
          style={fieldStyle} onChange={(e) => setFirstName(e.target.value)} required />

        <label htmlFor="last_name">Last Name</label>
        <input id="last_name" type="text" name="last_name" placeholder="Last Name"
          style={fieldStyle} onChange={(e) => setLastName(e.target.value)} required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" placeholder="Email"
          style={fieldStyle} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" placeholder="Password"
          style={fieldStyle} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" style={{ padding: "10px 24px", background: "#0d6efd", color: "#fff", border: "none", borderRadius: "4px" }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;