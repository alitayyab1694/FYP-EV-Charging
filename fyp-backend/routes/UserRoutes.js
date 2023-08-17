import express from "express";
import { getUsers, getUser, login , creatUser, getUserByCompany, createCompanyUser, getCompanyUsers } from "../controller/UserController.js";
import { authenticate as auth } from "../Middleware/auth.js";

const router = express.Router();

router.get("/users", auth, getUsers);
router.get("/company/users", auth, getCompanyUsers);
router.get("/users/:id", auth, getUser);
router.get('/company/:id',auth ,getUserByCompany)
router.post('/company/create' ,createCompanyUser)
router.post(
  '/signup',
  creatUser
);

router.post("/login", login);
export default router;
