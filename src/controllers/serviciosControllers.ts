import { Request, Response } from "express";
import prisma from "../models/serviciosModels";
//prisma.servicio
import { error } from "console";

export const createServicio = async (req: Request,res: Response): Promise<void> => {
  try {
    const { nombre, descripcion, precio } = req.body;
    if (!nombre) {
      res.status(400).json({ message: "El nombre es obligatorio" });
      return;
    }
    if (!descripcion) {
      res.status(400).json({ message: "La descripcion es obligatorio" });
      return;
    }
    if (!precio) {
      res.status(400).json({ message: "El precio es obligatorio" });
      return;
    }

    const servicios = await prisma.create({
      data: {
        nombre,
        descripcion,
        precio
      },
    });

    res.status(200).json(servicios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "hubo un error en el registro" });
  }
};

//OBTIENE TODOS LOS SERVICIOS
export const getAllServicios = async (req: Request,res: Response): Promise<void> => {
  try {
    const servicios = await prisma.findMany();
    res.status(200).json(servicios);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
  }
};


export const getServicioById = async (req: Request,res: Response): Promise<void> => {
  try {
    const servicioId = parseInt(req.params.id);
    const servicio = await prisma.findUnique({
      where: {
        id_servicio: servicioId,
      },
    });

    if (!servicio) {
      res.status(408).json({ error: "el usuario no fue encontrado" });
      return;
    }

    res.status(200).json(servicio);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
  }
};

//ACTUALIZACION DE SERVICIO
export const updateServicio = async (req: Request,res: Response): Promise<void> => {
  try {
    const servicioId = parseInt(req.params.id);
    let dataToUpdate: any = {...req.body}

    if (!dataToUpdate.nombre) {
      res.status(400).json({ message: "El usuario es obligatorio" });
      return;
    }
    if (!dataToUpdate.descripcion) {
      res.status(400).json({ message: "El celular es obligatorio" });
      return;
    }
    if (!dataToUpdate.precio) {
      res.status(400).json({ message: "El email es obligatorio" });
      return;
    }

    const servicio = await prisma.update({
      where: {
        id_servicio: servicioId
      },
      data: dataToUpdate
    })

    res.status(200).json(servicio);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
  }
};

//eliminar servicio
export const deleteServicio = async (req: Request,res: Response): Promise<void> => {
  const servicioId = parseInt(req.params.id);

try {
  await prisma.delete({
    where: {
      id_servicio: servicioId
    }
  })

  res.status(200).json({
    message: `el usuario ${servicioId} ha sido eliminado`
  }).end();


} catch (error:any) {
  console.log(error);
  res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
}

}

