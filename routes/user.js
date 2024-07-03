const express = require("express");
const bcrypt = require("bcrypt");
const { findByEmail, register } = require("../db/user");
const router = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken");

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = UserSchema.parse(req.body);
    const user = await findByEmail(email);
    if (user) return res.status(400).json({ message: "User already exists" });
    const hash = bcrypt.hashSync(password, 10);
    const savedUser = await register(email, hash);
    delete savedUser.password;
    res.json(savedUser);
  } catch (error) {
    if (error instanceof z.ZodError) res.status(400).json(error);
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = UserSchema.parse(req.body);
    const user = await findByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) res.status(400).json(error);
    res.status(500).send();
  }
});

module.exports = {
  router,
};
