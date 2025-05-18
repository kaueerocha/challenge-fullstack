import { Router } from 'express';
import { listarNiveis, criarNivel, editarNivel, deletarNivel } from '../controllers/nivel.controller';

const router = Router();

router.get('/', listarNiveis);
router.post('/', criarNivel);
router.patch('/:id', editarNivel);
router.delete('/:id', deletarNivel);

export default router;
