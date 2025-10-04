import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");         // stores the email input
  const [submitted, setSubmitted] = useState(false); // true after form submit
  const [verified, setVerified] = useState(false);   // true if "verified"
  const [loading, setLoading] = useState(false);     // true while API responds
  const [error, setError] = useState("");            // stores error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Verification failed. Try again later.");
      }

      const data = await res.json();

      setTimeout(() => {
        setVerified(data.verified);
        setLoading(false);
      }, 1500); // simulate AI processing delay

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "Arial, sans-serif" }}>
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
            disabled={loading}
          />
          <button
            type="submit"
            style={{ padding: "10px 20px", marginLeft: "10px", cursor: "pointer" }}
            disabled={loading}
          >
            Get Started
          </button>
        </form>
      ) : loading ? (
        <p>Verifying your AI identity...</p>
      ) : error ? (
        <p style={{ color: "red" }}>⚠️ {error}</p>
      ) : (
        <p>✅ Verified! Welcome, {email}</p>
      )}
    </div>
  );
}
