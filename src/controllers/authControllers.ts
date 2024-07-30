import { Request, Response } from "express";
import { comparePasswords, hashPassword } from "../services/password.services";
import prisma from "../models/userModels";
import { generateToken } from "../services/auth.services";
import { error } from "console";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { user, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const usuario = await prisma.create({
      data: {
        user,
        password: hashedPassword,
      },
    });

    const token = generateToken(usuario);
    res.status(201).json({token});
  } catch (error:any) {

    if(!user){
        res.status(400).json({message: 'el email es obligatorio'})
    }
    
    if(!password){
        res.status(400).json({message: 'el password es obligatorio'})
    }
    
    if(error?.code === 'P2002' && error?.meta?.target?.includes('usuario')){
        res.status(400).json({message: 'El mail ingresado ya existes'});
    }

    //to do mejorer los errores
    console.log(error);
    res.status(500).json({ error: "hubo un erroe en elr egistro" });
  }
};

export const login = async (req:Request,res:Response):Promise<void> =>{
    const { user, password } = req.body;
    console.log("si")
    try{


        if (!user) {
            res.status(400).json({ message: 'El usuario es obligatorio' })
            return
        }
        if (!password) {
            res.status(400).json({ message: 'El password es obligatorio' })
            return
        }
        console.log(user)
        const usuario = await prisma.findUnique(
          {
            where:{
              user
            }
          })

          console.log(usuario)

        if(!usuario){
            res.status(404).json({error:'Usuario no encontrado'})
            return
        }

        const passwordMatch = await comparePasswords(password,usuario.password) /// comparador de contrasenas
        if(!passwordMatch){
            res.status(401).json({error:'usuario y contrasena no coinciden'})
        }

        const token = generateToken(user)
        res.status(200).json({token})

    }catch(error){

    }
}
