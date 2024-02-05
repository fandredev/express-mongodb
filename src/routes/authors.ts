import express from 'express';
import AuthorController from '../controllers/AuthorController.js';

const router = express.Router();

router.get('/authors', AuthorController.index);
router.get('/authors/:id', AuthorController.show);

router.post('/authors', AuthorController.create);
router.put('/authors/:id', AuthorController.update);

router.delete('/authors/:id', AuthorController.destroy);

export default router;
