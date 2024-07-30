import express, { NextFunction,Request,Response } from "express";
import { authenticateToken } from "../services/authToken.services";
const router = express.Router();

import { completarCita, createCita, deleteCita, getAllcitas, getcitasByIdcliente, updateCita } from "../controllers/citasControllers";

//agendar una nueva cita
router.post('/',authenticateToken ,createCita);
//ver listado de citas
router.get('/',authenticateToken ,getAllcitas);
//ver listado de citas por id
router.get('/:id',authenticateToken ,getcitasByIdcliente);
//editar cita
router.put('/:id',authenticateToken ,updateCita);
//eliminar cita
router.delete('/:id',authenticateToken ,deleteCita);
//completar cita
router.patch('/:id',authenticateToken ,completarCita);


export default router;