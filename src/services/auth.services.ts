import jwt from "jsonwebtoken"
import { Login } from "../interfaces/user.interface"

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'


export const generateToken = (usuario: Login):string =>{
return jwt.sign({id_usuario:usuario.id_usuario,user:usuario.user}, JWT_SECRET,{expiresIn: '1h' })
}