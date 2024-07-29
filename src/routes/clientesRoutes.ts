import express, { NextFunction,Request,Response } from "express";
import jwt  from "jsonwebtoken";
import { createClientes, deleteUsuario, getAllUsers, getUsuariById, updateUsuario } from "../controllers/clientesControllers";
// import { login, register } from "../controllers/authControllers";
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'


const authenticateToken = (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] || '0'
  
    if(!token){
        res.status(401).json({error: 'No autorizado'})
    }

    jwt.verify(token,JWT_SECRET,(error,decoded)=>{
        if(error){
            console.error("error en la tutentificacion")
            return res.status(403).json({error:'no tienes acceso a este reurso'})
        }
    next();
        });

}


router.post('/',authenticateToken ,createClientes);
router.get('/',authenticateToken ,getAllUsers);
router.get('/:id',authenticateToken ,getUsuariById);
router.put('/:id',authenticateToken ,updateUsuario);
router.delete('/:id',authenticateToken ,deleteUsuario);


export default router;