import books from '../models/Book.js';
import { author as authors } from '../models/Author.js';
import { Request, Response } from 'express';

class BookController {
  static async index(req: Request, res: Response) {
    try {
      const allBooks = await books.find({});
      res.status(200).json(allBooks);
    } catch (error) {
      if (error instanceof Error)
        res
          .status(500)
          .json({ message: `${error.message} - Unable to list books.` });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const bookFound = await books.findById(id);
      if (bookFound) {
        res.status(200).json(bookFound);
      } else {
        res.status(404).send('Book not found');
      }
    } catch (error) {
      if (error instanceof Error)
        res
          .status(500)
          .json({ message: `${error.message} - Unable to find the book.` });
    }
  }

  static async showByEditor(req: Request, res: Response) {
    const editor = req.query.q;
    try {
      const booksByQuery = await books.find({ editor });
      if (booksByQuery.length > 0) {
        res.status(200).json(booksByQuery);
      } else {
        res.status(404).send(`Books by ${editor} parameter not found`);
      }
    } catch (error) {
      if (error instanceof Error)
        res
          .status(500)
          .json({ message: `${error.message} - Unable to find the books.` });
    }
  }

  static async create(req: Request, res: Response) {
    const newBook = req.body;
    try {
      const authorFound = await authors.findById(newBook.author);
      const bookComplete = {
        ...newBook,
        author: {
          ...authorFound?.toObject()
        }
      };
      const bookCreated = new books(bookComplete);

      res.status(201).json({
        message: 'Book created',
        bookCreated
      });
    } catch (error) {
      if (error instanceof Error)
        res
          .status(500)
          .json({ message: `${error.message} - Unable to register a book.` });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await books.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Book updated' });
    } catch (error) {
      if (error instanceof Error)
        res
          .status(500)
          .json({ message: `${error.message} - Unable to update the book.` });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await books.findByIdAndDelete(id);
      res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
      if (error instanceof Error)
        res
          .status(500)
          .json({ message: `${error.message} - Unable to delete the book.` });
    }
  }
}

export default BookController;
