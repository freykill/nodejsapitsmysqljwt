import express, { NextFunction,Request,Response } from "express";
import { authenticateToken } from "../services/authToken.services";
const router = express.Router();

import { createClientes, deleteUsuario, getAllUsers, getUsuariById, updateUsuario } from "../controllers/clientesControllers";

router.post('/',authenticateToken ,createClientes);
router.get('/',authenticateToken ,getAllUsers);
router.get('/:id',authenticateToken ,getUsuariById);
router.put('/:id',authenticateToken ,updateUsuario);
router.delete('/:id',authenticateToken ,deleteUsuario);


export default router;