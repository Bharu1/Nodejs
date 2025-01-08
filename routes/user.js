import express from "express";
import { addUser, getUsers, getUserById, loginUser } from "../controllers/user.js";

const router = express.Router();

router.post("/create/user", addUser);
router.post("/login", loginUser);
router.get("/get/users", getUsers);
router.get("/get/user/:id", getUserById);

router.get("/", (req, res) => {
  res.send("Welcome to the API! You can access users data at /user");
});

export default router;
