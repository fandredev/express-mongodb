import express from 'express'
import books from './books.js'
import authors from './authors.js'

const allRoutes = (app) => {
    app.route('/').get((req, res) => res.status(200).send('Use the /books or /authors route.'))
    app.use(express.json(), books, authors)
}

export default allRoutes