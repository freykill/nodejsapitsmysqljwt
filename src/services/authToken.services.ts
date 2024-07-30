import express, { NextFunction,Request,Response } from "express";
import jwt  from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

export const authenticateToken = (req:Request,res:Response,next:NextFunction) => {
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