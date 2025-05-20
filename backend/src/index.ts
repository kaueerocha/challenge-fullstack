import express from 'express';
import cors from 'cors';
import nivelRoutes from './routes/nivel.routes';
import devRoutes from './routes/dev.routes';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.use('/api/nivel', nivelRoutes);
app.use('/api/desenvolvedor', devRoutes);

app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`);
});
