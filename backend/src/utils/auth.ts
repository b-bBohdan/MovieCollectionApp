import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const KEY = process.env.JWT_KEY;

export function createJSONToken(id: string, email: string): string {
  if (!KEY) {
    throw new Error("Missing JWT_KEY in environment variables");
  }

  return jwt.sign({ userId: id, email: email }, KEY, { expiresIn: "1h" });
}
