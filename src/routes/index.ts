import express, { Request, Response, Express } from 'express'
import books from './books.js'
import authors from './authors.js'

const allRoutes = (app: Express) => {
    app.route('/').get((req: Request, res: Response) => res.status(200).send('Use the /books or /authors route.'))
    app.use(express.json(), books, authors)
}

export default allRoutes