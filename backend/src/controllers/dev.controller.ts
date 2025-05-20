import { Request, Response } from 'express';
import {
   createDev,
   deleteDev,
   getAllDev,
   updateDev,
} from '../services/dev.service';

export const listarDevs = async (req: Request, res: Response) => {
   try {
      const nome = req.query.nome?.toString();

      const devs = await getAllDev(nome);

      res.status(200).json(devs);
   } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar desenvolvedores' });
   }
};

export const criarDev = async (req: Request, res: Response) => {
   const { nivel_id, nome, sexo, data_nascimento, hobby } = req.body;

   if (!nivel_id || !nome || !sexo || !data_nascimento || !hobby) {
      res.status(400).json({ error: 'Dados incompletos' });
      return;
   }

   try {
      const createdDev = await createDev({
         nivel_id,
         nome,
         sexo,
         data_nascimento,
         hobby,
      });
      res.status(201).json(createdDev);
   } catch (error) {
      console.error(error);
      res.status(400).json({
         error: 'Erro ao criar desenvolvedor',
         details: error,
      });
   }
};

export const editarDev = async (req: Request, res: Response) => {
   const { nivel_id, nome, sexo, data_nascimento, hobby } = req.body;
   const { id } = req.params;

   if (!nivel_id || !nome || !sexo || !data_nascimento || !hobby) {
      res.status(400).json({ error: 'Dados incompletos' });
      return;
   }

   try {
      const dev = await updateDev({
         id: Number(id),
         nivel_id,
         nome,
         sexo,
         data_nascimento,
         hobby,
      });
      res.status(200).json(dev);
      return;
   } catch (error: any) {
      res.status(400).json({ error: error.message });
      return;
   }
};

export const deletarDev = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      await deleteDev(Number(id));
      res.status(204).send();
      return;
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
};
