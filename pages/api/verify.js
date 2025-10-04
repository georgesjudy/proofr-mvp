import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "verified-emails.json");

export default function handler(req, res) {
  // Read existing emails
  let verifiedEmails = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    verifiedEmails = JSON.parse(data);
  }

  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // mock verification
    const verified = true;
    verifiedEmails.push({ email, verified, timestamp: new Date() });

    // Save back to file
    fs.writeFileSync(filePath, JSON.stringify(verifiedEmails, null, 2));

    return res.status(200).json({ email, verified });
  }

  if (req.method === "GET") {
    return res.status(200).json(verifiedEmails);
  }

  res.status(405).json({ error: "Method not allowed" });
}
