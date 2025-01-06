import express from "express";
import { addUser, getUsers, getUserById } from "../controllers/user.js";

const router = express.Router();

router.route("/create/user").post(addUser);
router.route("/get/users").get(getUsers);
router.route("/get/user/:id").get(getUserById);

router.get("/", (req, res) => {
    res.send("Welcome to the API! You can access users data at /user");
});

export default router;
