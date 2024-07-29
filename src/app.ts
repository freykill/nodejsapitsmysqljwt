import dotenv from 'dotenv';
import express from "express";
import authRoutes from './routes/authRoutes';
import clientesRoutes from './routes/clientesRoutes'
dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/auth', authRoutes)
// productos
app.use('/clientes',clientesRoutes)
export default app;
