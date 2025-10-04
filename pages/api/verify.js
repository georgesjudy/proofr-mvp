let verifiedEmails = []; // temporary in-memory storage

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // MOCK AI verification (always returns true for now)
    const verified = true;

    // store verification history (in-memory)
    verifiedEmails.push({ email, verified, timestamp: new Date() });

    return res.status(200).json({ email, verified });
  }

  if (req.method === "GET") {
    return res.status(200).json(verifiedEmails);
  }

  res.status(405).json({ error: "Method not allowed" });
}
