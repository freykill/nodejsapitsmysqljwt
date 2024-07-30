import express, { NextFunction,Request,Response } from "express";
import { authenticateToken } from "../services/authToken.services";
const router = express.Router();

import { createServicio, deleteServicio, getAllServicios, getServicioById, updateServicio } from "../controllers/serviciosControllers";

router.post('/',authenticateToken ,createServicio);
router.get('/',authenticateToken ,getAllServicios);
router.get('/:id',authenticateToken ,getServicioById);
router.put('/:id',authenticateToken ,updateServicio);
router.delete('/:id',authenticateToken ,deleteServicio);


export default router;