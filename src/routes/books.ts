import express from 'express';
import BookController from '../controllers/BookController.js';


const router = express.Router();

router.get('/books', BookController.index);
router.get('/books/search', BookController.showByEditor);

router.get('/books/:id', BookController.show);

router.post('/books', BookController.create);
router.put('/books/:id', BookController.update);

router.delete('/books/:id', BookController.destroy);

export default router;