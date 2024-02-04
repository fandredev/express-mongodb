import books from '../models/Book.js'

class BookController {
  static async index(req, res) {
    try {
      const allBooks = await books.find({})
      res.status(200).json(allBooks)
    }
    catch (error) {
      res.status(500).json({ message: `${error.message} - Não foi possível listar os livros.` })
    }
  }

  static async show(req, res) {
    try {
      const id = req.params.id
      const bookFound = await books.findById(id)
      if (bookFound) {
        res.status(200).json(bookFound)
      } else {
        res.status(404).send('Book not found')
      }
    }
    catch (error) {
      res.status(500).json({ message: `${error.message} - Não foi possível encontrar o livro.` })
    }
  }

  static async create(req, res) {
    try {
      const newBook = await books.create(req.body)
      res.status(201).json({
        message: 'Book created',
        newBook
      })
    }
    catch (error) {
      res.status(500).json({ message: `${error.message} - Não foi possível cadastrar um livro.` })
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id
      await books.findByIdAndUpdate(id, req.body)
      res.status(200).json({ message: 'Book updated' })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Unable to update the book.` })
    }
  }

  static async destroy(req, res) {
    try {
      const id = req.params.id
      await books.findByIdAndDelete(id)
      res.status(200).json({ message: 'Book deleted' })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Unable to delete the book.` })
    }
  }
}

export default BookController