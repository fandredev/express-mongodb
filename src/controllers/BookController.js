import books from '../models/Book.js'
import { author as authors } from '../models/Author.js'

class BookController {
  static async index(req, res) {
    try {
      const allBooks = await books.find({})
      res.status(200).json(allBooks)
    }
    catch (error) {
      res.status(500).json({ message: `${error.message} - Unable to list books.` })
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
      res.status(500).json({ message: `${error.message} - Unable to find the book.` })
    }
  }

  static async showByEditor(req, res) {
    const editor = req.query.q
    try {
      const booksByQuery = await books.find({ editor })
      if (booksByQuery.length > 0) {
        res.status(200).json(booksByQuery)
      } else {
        res.status(404).send(`Books by ${editor} parameter not found`)
      }
    }
    catch (error) {
      res.status(500).json({ message: `${error.message} - Unable to find the books.` })
    }
  }

  static async create(req, res) {
    const newBook = req.body
    try {
      const authorFound = await authors.findById(newBook.author)
      const bookComplete = { ...newBook, author: {
        ...authorFound._doc
      } }
      const bookCreated = new books(bookComplete)

      res.status(201).json({
        message: 'Book created',
        bookCreated
      })
    }
    catch (error) {
      res.status(500).json({ message: `${error.message} - Unable to register a book.` })
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