import jwt from "jsonwebtoken"
import { User } from "../models/user.interface"

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'
console.log("esto es real" +JWT_SECRET)

export const generateToken = (user: User):string =>{
return jwt.sign({id:user.id,usuario:user.usuario}, JWT_SECRET,{expiresIn: '1h' })
}