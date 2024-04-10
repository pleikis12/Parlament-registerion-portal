import { Router } from "express";
import multer from "multer";
import mongoose from "mongoose";

import upload from "../middleware/multer.js";
import Project from "../models/project.js";
import auth from "../middleware/auth.js";
import userAuth from "../middleware/userAuth.js";
import addminAuth from "../middleware/addminAuth.js";

const router = Router();
const uploadFn = upload.single('picture')

// get all projects
router.get('/', auth, async (req, resp) => {
  try {
    resp.status(200).json(await Project.find().populate('author', ['name', 'surname', 'party_name']))
  } catch (err) {
    resp.status(500).json(err);
  }
})

// get single project by _id
router.get('/projektas/:id', auth, async (req, resp) => {
  try {
    resp.status(200).json(await Project.findById(req.params.id).populate('author', ['name', 'surname', 'party_name']))
  } catch (err) {
    resp.status(500).json(err);
  }
})

// create new project
router.post('/', userAuth, async (req, resp) => {
  uploadFn(req, resp, async (err) => {
    if (err instanceof multer.MulterError) return resp.status(406).json(err.message)
    else if (err === 'format') return resp.status(406).json('Netinkamas nuotraukos formatas, leidžiami nutraukų formatai: jpg/jpeg, png')

    if (req.file) req.body.picture = req.file.filename;

    try {
      await Project.create(req.body);
      resp.status(200).json('Projektas sekmingai įkeltas');
    } catch (err) {
      if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
        resp.status(406)
          .json(
            `projekto svarstymo data jau užimta pasirinkite kitą datą`
          ) // mongodb returns error when duplicate entries are detected
      } else if (err instanceof mongoose.Error.ValidationError) resp.status(406).json(Object.values(Object.values(err)[0])[0].message);
      else resp.status(500).json(err);
    }
  })
})

// update project
router.put('/:id', userAuth, async (req, resp) => {
  uploadFn(req, resp, async (err) => {
    if (err instanceof multer.MulterError) return resp.status(406).json(err.message)
    else if (err === 'format') return resp.status(406).json('Netinkamas nuotraukos formatas, leidžiami nutraukų formatai: jpg/jpeg, png')

    if (req.file) req.body.picture = req.file.filename;

    try {
      await Project.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
      resp.status(200).json('Projektas sekmingai atnaujintas');
    } catch (err) {
      resp.status(500).json(err);
    }
  });
});

router.put('/keisti-statusa/:id', addminAuth, async (req, resp) => {
  uploadFn(req, resp, async (err) => {
    if (err instanceof multer.MulterError) return resp.status(406).json(err.message)
    else if (err === 'format') return resp.status(406).json('Netinkamas nuotraukos formatas, leidžiami nutraukų formatai: jpg/jpeg, png')

    if (req.file) req.body.picture = req.file.filename;

    try {
      await Project.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
      resp.status(200).json('Statusas sekmingai pakeistas');
    } catch (err) {
      resp.status(500).json(err);
    }
  });
});

// delete project
router.delete('/:id', userAuth, async (req, resp) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    resp.status(200).json("Projektas Sekmingai ištrintas")
  } catch (err) {
    resp.status(500).json(err)
  }
})

export default router;

