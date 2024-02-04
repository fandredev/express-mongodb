import express from 'express'
import searchBook, {findIndexBook, listBooks} from './utils/book-search.js'
import connectDatabase from './config/db-connect.js'
import routes from './routes/index.js'

const database = await connectDatabase()
database.on('error', (error) => console.log(`Error connecting to the database: ${error}`))
database.once('open', () => console.log(`Connected to the database`))

const app = express()
routes(app)

const books = listBooks()
const PORT = 3000


app.delete('/books/:id', (req, res) => {
  const id = req.params.id
  const index = findIndexBook(id)
  books.splice(index, 1)
  res.status(200).send('Book deleted')
})


app.listen(PORT, () => console.log('Running on http://localhost:3000/'))
