import dotenv from 'dotenv';
import express from "express";
import authRoutes from './routes/authRoutes';
import clientesRoutes from './routes/clientesRoutes'
import serviciosRoutes from './routes/serviciosRoutes'
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5174', // Permite solo este origen
    // Si deseas permitir todos los orígenes, usa:
    // origin: '*'
  }));

// Routes PRINCIPALES
//REGISTRO, LOGIN
app.use('/login', authRoutes)
// CLIENTES
app.use('/clientes',clientesRoutes)
//CITAS
app.use('/citas', ()=>{})
//SERVICIOS
app.use('/servicios',serviciosRoutes )

export default app;
