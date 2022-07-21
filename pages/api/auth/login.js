import db from "../../../libs/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  const checkUser = await db("users").where({ email: email }).first();
  if (!checkUser) {
    return res.status(401).end();
  }

  //   untuk ngecheck password yang ada di database dengan password yang diinputkan sama atau tidak
  const checkPassword = await bcrypt.compare(password, checkUser.password);
  if (!checkPassword) {
    return res.status(401).end();
  }

  const token = jwt.sign(
    {
      id: checkUser.id,
      email: checkUser.email,
    },
    "secret123",
    { expiresIn: "3h" }
  );

  res.status(200);
  res.json({ message: "login succsessfully", token: token });
}
