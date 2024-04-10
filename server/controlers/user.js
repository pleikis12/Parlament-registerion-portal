import { Router } from "express";
import User from "../models/user.js";
import multer from "multer";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import passwordValidate from "../middleware/passwordValidate.js";
import addminAuth from "../middleware/addminAuth.js";
import auth from "../middleware/auth.js";

const router = Router();
const upload = multer();

router.get("/check-auth", auth, (req, res) => {
  res.status(200).json(req.session.user);
});

router.get("/atsijungti", (req, res) => {
  req.session.destroy();
  res.json("Sveikiname sėkmingai atsijungus");
});

//get all users
router.get("/vartotojai", addminAuth, async (req, resp) => {
  try {
    resp.status(200).json(await User.find());
  } catch (err) {
    resp.status(500).json(Object.values(Object.values(err)[0])[0].message);
  }
});
// get single user by id
router.get("/vartotojai/:id", addminAuth, async (req, resp) => {
  try {
    resp.status(200).json(await User.findById(req.params.id));
  } catch (err) {
    resp.status(500).json(Object.values(Object.values(err)[0])[0].message);
  }
});

//create new user
router.post(
  "/vartotojai",
  addminAuth,
  upload.none(),
  passwordValidate,
  async (req, resp) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      await User.create(req.body);
      resp.status(200).json("Vartotojas sekmingai sukurtas");
    } catch (err) {
      if (
        err instanceof mongoose.mongo.MongoServerError &&
        err.code === 11000
      ) {
        resp
          .status(406)
          .json(
            `${Object.keys(err.keyValue)[0]}: ${
              Object.values(err.keyValue)[0]
            } jau yra naudojamas`
          ); // mongodb returns error when duplicate entries are detected
      } else if (err instanceof mongoose.Error.ValidationError)
        resp.status(406).json(Object.values(Object.values(err)[0])[0].message);
      //mongoose returns error when validation fails
      else {
        resp.status(500).json(err);
      }
    }
  }
);

//user loggin
router.post("/prisijungti", upload.none(), async (req, resp) => {
  try {
    const data = await User.findOne({ email: req.body.email });

    if (!data)
      return resp
        .status(401)
        .json(
          "Neteisingai įvesti prisjungimo duomenys arba vartotojas neegzistuoja"
        );

    if (!(await bcrypt.compare(req.body.password, data.password)))
      return resp
        .status(401)
        .json(
          "Neteisingai įvesti prisjungimo duomenys arba vartotojas neegzistuoja"
        );

    if (!data.active_user)
      return resp.status(401).json("vartotojas yra neaktyvuotas");

    req.session.user = {
      _id: data._id,
      name: data.name,
      surname: data.surname,
      addmin: data.addmin,
      email: data.email,
    };
    resp.json(req.session.user);
  } catch {
    resp.status(500).json("Įvyko klaida prisijungiant");
  }
});

//update user
router.put("/vartotojai/:id", addminAuth, upload.none(), async (req, resp) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    resp.status(200).json("Vartotojas sekmingai atnaujintas");
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      resp
        .status(406)
        .json(
          `${Object.keys(err.keyValue)[0]}: ${
            Object.values(err.keyValue)[0]
          } jau yra naudojamas`
        ); // mongodb returns error when duplicate entries are detected
    } else if (err instanceof mongoose.Error.ValidationError)
      resp.status(406).json(Object.values(Object.values(err)[0])[0].message);
    //mongoose returns error when validation fails
    else {
      resp.status(500).json(err);
    }
  }
});

export default router;
