import express from 'express'
import connectDatabase from './config/db-connect.js'
import routes from './routes/index.js'

const database = await connectDatabase()
database.on('error', (error) => console.log(`Error connecting to the database: ${error}`))
database.once('open', () => console.log(`Connected to the database`))

const app = express()
routes(app)

const PORT = 3000


app.listen(PORT, () => console.log('Running on http://localhost:3000/'))
