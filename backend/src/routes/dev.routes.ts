import { Router } from 'express';
import { criarDev, editarDev, listarDevs, deletarDev } from '../controllers/dev.controller';

const router = Router();

router.get('/', listarDevs);
router.post('/', criarDev);
router.put('/:id', editarDev);
router.delete('/:id', deletarDev);

export default router;
