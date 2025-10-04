import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Verification failed");

      const data = await res.json();
      setTimeout(() => {
        setVerified(data.verified);
      }, 1500);
    } catch (err) {
      setError("Something went wrong. Try again.");
      setSubmitted(false);
    }
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
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : !verified ? (
        <p>Verifying your AI identity...</p>
      ) : (
        <p>✅ Verified! Welcome, {email}</p>
      )}
    </div>
  );
}
