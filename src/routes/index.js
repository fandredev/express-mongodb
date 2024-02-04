import express from 'express'
import books from './books.js'

const allRoutes = (app) => {
    app.route('/').get((req, res) => res.status(200).send('Curso de Express API'))
    app.use(express.json(), books)
}

export default allRoutes