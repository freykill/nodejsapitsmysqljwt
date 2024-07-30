import { Request, Response } from "express";
import prisma from "../models/citasModels";
import prismaClientes from "../models/clientesModels";
import prismaServicio from "../models/serviciosModels";
import { error } from "console";

export const createCita = async (req: Request,res: Response): Promise<void> => {
  const { id_cliente, estado, fecha, hora, id_servicio } = req.body;

  try {

    const cliente = await prismaClientes.findUnique({
      where: {
        id_cliente
      },
    });

    if(!cliente){
      res.status(404).json({message:"Cliente no existe"})
    }

    const servicio = await prismaServicio.findUnique({
      where: {
        id_servicio
      },
    });

    if(!servicio){
      res.status(404).json({message:"Servicio no existe"})
    }

      // Verificar que no haya conflictos de fecha y hora
      const fechaHora = new Date(fecha + 'T' + hora);
      const conflictoCitas = await prisma.findFirst({
        where: {
          hora: fechaHora
        },
      });

      if (conflictoCitas) {
        res.status(409).json({ message: 'Conflicto de cita: ya existe una cita en esta fecha y hora' });
      }

    
    const nuevaCita = await prisma.create({
      data: {
        id_cliente: id_cliente,
        estado: estado,
        fecha: new Date(fecha),
        hora: new Date(hora),
        id_servicio: id_servicio,
      },
    });

    res.status(201).json({ message: 'Cita agendada exitosamente', cita: nuevaCita });


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "hubo un error en el registro" });
  }
};

export const getAllcitas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const citas = await prisma.findMany();
    res.status(200).json(citas);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
  }
};


export const getcitasByIdcliente = async (req: Request,res: Response): Promise<void> => {
  try {
    const citasId = parseInt(req.params.id);
    const cita = await prisma.findMany({
      where: {
        id_cita: citasId,
      },
    });

    if (!cita) {
      res.status(408).json({ error: "el usuario no fue encontrado" });
      return;
    }

    res.status(200).json(cita);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
  }
};

export const updateCita = async (req: Request,res: Response): Promise<void> => {
  const { id_cita, id_cliente, estado, fecha, hora, id_servicio } = req.body;

  try {
    // Verificar que la cita exista
    const citaExistente = await prisma.findUnique({
      where: {
        id_cita: id_cita,
      },
    });

    if (!citaExistente) {
      res.status(404).json({ message: "Cita no encontrada" });
    } else {
      // Verificar que el cliente exista (si se está actualizando el cliente)
      if (id_cliente) {
        const cliente = await prismaClientes.findUnique({
          where: {
            id_cliente: id_cliente,
          },
        });

        if (!cliente) {
          res.status(404).json({ message: "Cliente no encontrado" });
        }
      }

      // Verificar que el servicio exista (si se está actualizando el servicio)
      if (id_servicio) {
        const servicio = await prismaServicio.findUnique({
          where: {
            id_servicio: id_servicio,
          },
        });

        if (!servicio) {
          res.status(404).json({ message: "Servicio no encontrado" });
        }
      }

      const citaActualizada = await prisma.update({
        where: {
          id_cita: id_cita,
        },
        data: {
          id_cliente: id_cliente || citaExistente.id_cliente,
          estado: estado || citaExistente.estado,
          fecha: fecha ? new Date(fecha) : citaExistente.fecha,
          hora: hora ? new Date(hora) : citaExistente.hora,
          id_servicio: id_servicio || citaExistente.id_servicio,
        },
      });
      res
        .status(200)
        .json({
          message: "Cita actualizada exitosamente",
          cita: citaActualizada,
        });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
  }
  }


export const deleteCita = async (req: Request,res: Response): Promise<void> => {
  const citaId = parseInt(req.params.id);

try {
  await prisma.delete({
    where: {
      id_cita: citaId
    }
  })

  res.status(200).json({
    message: `el usuario ${citaId} ha sido eliminado`
  }).end();


} catch (error:any) {
  console.log(error);
  res.status(500).json({ error: "hubo un error, pruebe mas tarde" });
}

}

export const completarCita = async (req: Request,res: Response): Promise<void> => {
  const { id_cita } = req.body;

  try {
    // Verificar que la cita exista
    const citaExistente = await prisma.findUnique({
      where: {
        id_cita: id_cita,
      },
    });

    if (!citaExistente) {
      res.status(404).json({ message: 'Cita no encontrada' });
    }

    // Actualizar el estado de la cita a 'completado'
    const citaActualizada = await prisma.update({
      where: {
        id_cita: id_cita,
      },
      data: {
        estado: 'completado',
      },
    });

    res.status(200).json({ message: 'Cita marcada como completada', cita: citaActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

