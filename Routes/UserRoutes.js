import { Router } from "express";
const router = Router();
import validateToken from "API/TokenValidation.js";

import { getUser, getUsers, userRegister, loginUser } from "API/CRUD.js";
import { UpdateUser } from "../API/CRUD";

// router.route("/").get( validateToken, getUsers)

router.route("/").post(userRegister)

router.route("/").get(validateToken, getUser)

router.route("/login").post(loginUser);

router.route("/update").put(UpdateUser);

router.route("/delete").delete(deleteUser);

export default router
