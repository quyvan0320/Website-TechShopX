import jwt from "jsonwebtoken";
const createToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "Strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default createToken;
