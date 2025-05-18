import { Request, Response } from 'express';
import { createNivel, getAllNivel, updateNivel, deleteNivel } from '../services/nivel.service';

export const listarNiveis = async (req: Request, res: Response) => {
  try {
    const niveis = await getAllNivel();

    if (niveis.length === 0) {
        res.status(404).json({ error: 'Nenhum nível cadastrado' });
        return;
    }

    res.status(200).json(niveis);
    return;
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar níveis' });
    return;
  }
};

export const criarNivel = async (req: Request, res: Response) => {
  const { nivel } = req.body;

  if (!nivel || typeof nivel !== 'string') {
    res.status(400).json({
        error: 'Nome do nível é obrigatório e deve ser string',
    });
    return;
  }

  try {
    const createdNivel = await createNivel(nivel);
    res.status(201).json(createdNivel);
    return;
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar nível' });
    return;
  }
};

export const editarNivel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nivel } = req.body;

  if (!nivel || typeof nivel !== 'string') {
    res.status(400).json({
        error: 'Nome do nível é obrigatório e deve ser string',
    });
    return;
  }

  try {
    const updatedNivel = await updateNivel(Number(id), nivel);

    if (!updatedNivel) {
      res.status(404).json({ error: 'Nível não encontrado' });
      return;
    }

    res.status(201).json(updatedNivel);
    return;
  } catch (error) {
    res.status(400).json({ error: 'Erro ao editar nível' });
    return;
  }
};

export const deletarNivel = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await deleteNivel(Number(id));

    switch (result) {
      case 'HAS_ASSOCIATED':
        res.status(400).json({ error: 'Não é possível remover nível: há desenvolvedores associados'});
        return;
      case 'NOT_FOUND':
        res.status(404).json({ error: 'Nível não encontrado' });
        return;
      case 'OK':
        res.status(204).send();
        return;
      default:
        res.status(500).json({ error: 'Erro desconhecido ao remover nível '});
        return;
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover nível' });
    return;
  }

}
