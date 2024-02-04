import { author as authors } from '../models/Author.js';
import { Request, Response } from 'express';

class AuthorController {
  static async index(req: Request, res: Response) {
    try {
      const allAuthors = await authors.find({});
      res.status(200).json(allAuthors);
    }
    catch (error: unknown) {
      if (error instanceof Error)
        res.status(500).json({ message: `${error.message} - Unable to list authors.` });

    }
  }

  static async show(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const authorsFound = await authors.findById(id);
      if (authorsFound) {
        res.status(200).json(authorsFound);
      } else {
        res.status(404).send('Author not found');
      }
    }
    catch (error) {
      if (error instanceof Error)
        res.status(500).json({ message: `${error.message} - Unable to find the author.` });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const newAuthor = await authors.create(req.body);
      res.status(201).json({
        message: 'Author created',
        newAuthor
      });
    }
    catch (error) {
      if (error instanceof Error)
        res.status(500).json({ message: `${error.message} - Unable to register a author.` });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await authors.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Author updated' });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ message: `${error.message} - Unable to update the author.` });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(200).json({ message: 'Author deleted' });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ message: `${error.message} - Unable to delete the author.` });
    }
  }
}

export default AuthorController;