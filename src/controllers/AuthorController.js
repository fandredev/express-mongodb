import {author as authors} from '../models/Author.js'

class AuthorController {
  static async index(req, res) {
    try {
      const allAuthors = await authors.find({})
      res.status(200).json(allAuthors)
    }
    catch (error) {
      res.status(500).json({ message: `${error.message} - Unable to list authors.` })
    }
  }

  static async show(req, res) {
    try {
      const id = req.params.id
      const authorsFound = await authors.findById(id)
      if (authorsFound) {
        res.status(200).json(authorsFound)
      } else {
        res.status(404).send('Author not found')
      }
    }
    catch (error) {
      res.status(500).json({ message: `${error.message} - Unable to find the author.` })
    }
  }

  static async create(req, res) {
    try {
      const newAuthor = await authors.create(req.body)
      res.status(201).json({
        message: 'Author created',
        newAuthor
      })
    }
    catch (error) {
      res.status(500).json({ message: `${error.message} - Unable to register a author.` })
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id
      await authors.findByIdAndUpdate(id, req.body)
      res.status(200).json({ message: 'Author updated' })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Unable to update the author.` })
    }
  }

  static async destroy(req, res) {
    try {
      const id = req.params.id
      await authors.findByIdAndDelete(id)
      res.status(200).json({ message: 'Author deleted' })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Unable to delete the author.` })
    }
  }
}

export default AuthorController