import dotenv from 'dotenv';
import express from "express";
import authRoutes from './routes/authRoutes';
import clientesRoutes from './routes/clientesRoutes'
import serviciosRoutes from './routes/serviciosRoutes'
dotenv.config();

const app = express();
app.use(express.json());

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
