import { Request, Response } from "express";
import prisma from "../models/clientesModels";
import { error } from "console";

export const createClientes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nombre, celular, email } = req.body;

    if (!nombre) {
      res.status(400).json({ message: "El usuario es obligatorio" });
      return;
    }
    if (!celular) {
      res.status(400).json({ message: "El password es obligatorio" });
      return;
    }
    if (!email) {
      res.status(400).json({ message: "El password es obligatorio" });
      return;
    }

    const clientes = await prisma.create({
      data: {
        nombre: nombre,
        celular: celular,
        email: email,
      },
    });

    res.status(200).json(clientes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "hubo un error en el registro" });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.findMany();
    res.status(200).json(users);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
  }
};


export const getUsuariById = async (req: Request,res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const usuario = await prisma.findUnique({
      where: {
        id_cliente: userId,
      },
    });

    if (!usuario) {
      res.status(408).json({ error: "el usuario no fue encontrado" });
      return;
    }

    res.status(200).json(usuario);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
  }
};

export const updateUsuario = async (req: Request,res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    let dataToUpdate: any = {...req.body}

    if (!dataToUpdate.nombre) {
      res.status(400).json({ message: "El usuario es obligatorio" });
      return;
    }
    if (!dataToUpdate.celular) {
      res.status(400).json({ message: "El celular es obligatorio" });
      return;
    }
    if (!dataToUpdate.email) {
      res.status(400).json({ message: "El email es obligatorio" });
      return;
    }

    const usuario = await prisma.update({
      where: {
        id_cliente: userId
      },
      data: dataToUpdate
    })

    res.status(200).json(usuario);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
  }
};

export const deleteUsuario = async (req: Request,res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);

try {
  await prisma.delete({
    where: {
      id_cliente: userId
    }
  })

  res.status(200).json({
    message: `el usuario ${userId} ha sido eliminado`
  }).end();


} catch (error:any) {
  console.log(error);
  res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
}

}

