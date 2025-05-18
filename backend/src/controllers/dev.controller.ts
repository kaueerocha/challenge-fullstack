import { Request, Response } from 'express';
import { createDev, deleteDev, getAllDev, updateDev } from '../services/dev.service';

export const listarDevs = async (req: Request, res: Response) => {
   try {
      const devs = await getAllDev();

      if (devs.length === 0) {
         res.status(404).json({ error: 'Nenhum desenvolvedor cadastrado' });
         return;
      }

      res.status(200).json(devs);
      return;
   } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar desenvolvedores' });
      return;
   }
};

export const criarDev = async (req: Request, res: Response) => {
   const { nivel_id, nome, sexo, data_nascimento, hobby } = req.body;

   if (!nivel_id || !nome || !sexo || !data_nascimento || !hobby) {
      res.status(400).json({ error: 'Dados incompletos' });
      return;
   }

   try {
      const createdDev = await createDev(nivel_id, nome, sexo, data_nascimento, hobby);
      res.status(201).json(createdDev);
   } catch (error) {
      res.status(400).json({ error: 'Erro ao criar desenvolvedor', details: error });
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
      const dev = await updateDev(Number(id), 
         nome,
         hobby,
         nivel_id,
         sexo,
         data_nascimento,
      )
      res.status(200).json(dev);
      return;
   } catch (error: any) {
      res.status(400).json({ error: error.message });
      return;
   }

}

export const deletarDev = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      await deleteDev(Number(id));
      res.status(204).send();
      return;
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }

}
