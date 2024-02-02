import express from 'express'
import searchBook, {findIndexBook, listBooks} from './utils/book-search.js'
import connectDatabase from './config/db-connect.js'

import book from './models/Book.js'

const database = await connectDatabase()
database.on('error', (error) => console.log(`Error connecting to the database: ${error}`))
database.once('open', () => console.log(`Connected to the database`))

const app = express()
app.use(express.json())


const books = listBooks()
const PORT = 3000


app.get('/', (req, res) => {
  res.status(200).send('Curso de Express API')
})

app.get('/authors', (req, res) => {
  res.status(200).send('List of authors')
})

app.get('/books', async (req, res) => {
  const books = await book.find({})
  res.status(200).json(books)
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const book = searchBook(id)
  if (book) {
    res.status(200).json(book)
  } else {
    res.status(404).send('Book not found')
  }
})

app.post('/books', (req, res) => {
  books.push(req.body)
  res.status(201).send('Book created')
})

app.put('/books/:id', (req, res) => {
  const id = req.params.id
  const books = searchBook(id)
  books.title = req.body.title


  res.status(200).json(books)
})

app.delete('/books/:id', (req, res) => {
  const id = req.params.id
  const index = findIndexBook(id)
  books.splice(index, 1)
  res.status(200).send('Book deleted')
})


app.listen(PORT, () => console.log('Running on http://localhost:3000/'))

// const uri = "mongodb+srv://admin:<password>@cluster0.i7lwyms.mongodb.net/?retryWrites=true&w=majority";
// uKGjBrslVituB2ZY
