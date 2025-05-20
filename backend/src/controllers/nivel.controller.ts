import { Request, Response } from 'express';
import {
   createNivel,
   getAllNivel,
   updateNivel,
   deleteNivel,
} from '../services/nivel.service';

export const listarNiveis = async (req: Request, res: Response) => {
   try {
      const nivel = req.query.nivel?.toString();

      const niveis = await getAllNivel(nivel);

      res.status(200).json(niveis);
   } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar níveis' });
   }
};

export const criarNivel = async (req: Request, res: Response) => {
   const { nivel } = req.body;

   if (!nivel || typeof nivel !== 'string') {
      res.status(400).json({
         error: 'Nome do nível é obrigatório e deve ser string',
      });
   }

   try {
      const createdNivel = await createNivel(nivel);
      res.status(201).json(createdNivel);
   } catch (error) {
      res.status(400).json({ error: 'Erro ao criar nível' });
   }
};

export const editarNivel = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { nivel } = req.body;

   if (!nivel || typeof nivel !== 'string') {
      res.status(400).json({
         error: 'Nome do nível é obrigatório e deve ser string',
      });
   }

   try {
      const updatedNivel = await updateNivel(Number(id), nivel);

      if (!updatedNivel) {
         res.status(404).json({ error: 'Nível não encontrado' });
      }

      res.status(201).json(updatedNivel);
   } catch (error) {
      res.status(400).json({ error: 'Erro ao editar nível' });
   }
};

export const deletarNivel = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const result = await deleteNivel(Number(id));

      switch (result) {
         case 'HAS_ASSOCIATED':
            res.status(400).json({
               error: 'Não é possível remover nível: há desenvolvedores associados',
            });
         case 'NOT_FOUND':
            res.status(404).json({ error: 'Nível não encontrado' });
         case 'OK':
            res.status(204).send();
         default:
            res.status(500).json({
               error: 'Erro desconhecido ao remover nível ',
            });
      }
   } catch (error) {
      res.status(500).json({ error: 'Erro ao remover nível' });
   }
};
