import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { genPassword, addUser, getUserByEmail } from "../helper.js";
import { validation } from "../middlewares/validationMiddleware.js";
import {
  userSingInSchema,
  userLogInSchema,
} from "../validations/userValidation.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

//Signup
//validate if username alrady present
//validate if password matches
//store the user details
router.post("/signup", validation(userSingInSchema), async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const isUserExist = await getUserByEmail(email);
  if (isUserExist) {
    res.status(400).send({ message: "email alrady have an account" });
    return;
  }
  if (
    !/^(?=.*[0-9])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@!#%&]).{8,}$/g.test(
      password
    )
  ) {
    res.status(400).send({ message: "Password pattern doesnot match" });
    return;
  }
  const hashPassword = await genPassword(password);
  const result = await addUser(firstName, lastName, email, hashPassword);
  res.send(result);
});

//Login
router.post("/login", validation(userLogInSchema), async (req, res) => {
  const { email, password } = req.body;
  const userFromDb = await getUserByEmail(email);
  if (!userFromDb) {
    res.status(400).send({ message: "Invalid credentials" });
    return;
  }
  const sotredDbPassword = userFromDb.password;

  const isPasswordMatch = await bcrypt.compare(password, sotredDbPassword);
  if (!isPasswordMatch) {
    res.status(400).send({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: userFromDb._id }, process.env.JWT_SECRET);
  res.send({ message: "Sucessfull Login", token: token });
});

export const usersRouter = router;
