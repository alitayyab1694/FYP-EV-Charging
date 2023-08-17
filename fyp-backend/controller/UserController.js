import mongoose from "mongoose";
import User from "../models/User.js";
import HttpError from "../util/http-error.js";
import GenerateToken from "../util/jwt.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    // res.json({ users: users.map((user) => user.toObject({ getters: true })) });
    res.json(users);
  } catch (error) {
    const err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};
export const getCompanyUsers = async (req, res, next) => {
  try {
    const users = await User.find({role : "companyAdmin"}, "-password").populate("company");
    res.json(users);
  } catch (error) {
    const err = new HttpError("Something went wrong, please try again", 500);
    return next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    console.log(error);
    return next(err);
  }
};

export const getUserByCompany = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById({comapny: id})
    res.json(user)
  } catch (error) {
    console.log(error)
    return next(err)
  }
}

export const createCompanyUser = async (req, res, next) => {
  const { email, name   , company , password } = req.body;
  try {
    const user =  new User({ email, name:name, company :company  , role:"companyAdmin"  , password});
    await user.save()
    res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    const err = new HttpError("something went wrong, please try again", 500);
    return next(err);
  }
};
// const signup = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError("Invalid inputs passed, please check your data.", 422);
//   }
//   const { name, email, password } = req.body;
//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email: email });
//   } catch (error) {
//     const err = new HttpError("something went wrong, please try again", 500);
//     return next(err);
//   }

//   if (existingUser) {
//     const err = new HttpError("Email already exists", 422);
//     return next(err);
//   }

//   const user = new User({
//     name,
//     email,
//     password,
//     image:
//       "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_960_720.png",
//     places: [],
//   });

//   try {
//     await user.save();
//   } catch (error) {
//     const err = new HttpError("something went wrong, please try again", 500);
//     return next(err);
//   }

//   res.status(201).json({ user: user.toObject({ getters: true }) });
// };
export const creatUser = async (req, res, next) => {
  const { email, firstName  , lastName , firebaseId } = req.body;
  try {
    const user = await new User({ email, name: `${firstName} ${lastName}`, firebaseId });
    await user.save()
    res.status(200).json(user);
  } catch (error) {
    console.log("error", error);
    const err = new HttpError("something went wrong, please try again", 500);
    return next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser || existingUser.password !== password) {
      const err = new HttpError(
        "Invalid email or password, could not log in",
        401
      );
      return next(err);
    }
    res.status(200).send({
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
      role: existingUser.role,
      company: existingUser.company ?? undefined,
      token: GenerateToken(existingUser._id),
    });
  } catch (error) {
    console.log("error", error);
    const err = new HttpError("something went wrong, please try again", 500);
    return next(err);
  }
};
