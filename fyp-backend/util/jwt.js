import jwt from "jsonwebtoken";

const GenerateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

export default GenerateToken;
