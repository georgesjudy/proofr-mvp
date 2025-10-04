import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Email submitted:", email);
    // later we can connect this to a backend or database
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Proofr — AI Verified Creator Proof</h1>
      <p>Welcome to Proofr! Your AI-verified digital identity starts here.</p>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "10px", width: "250px" }}
          />
          <button
            type="submit"
            style={{ padding: "10px 20px", marginLeft: "10px", cursor: "pointer" }}
          >
            Get Started
          </button>
        </form>
      ) : (
        <p>Thank you! We’ll be in touch soon.</p>
      )}
    </div>
  );
}
