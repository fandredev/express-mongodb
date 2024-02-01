import http from 'http'

const PORT = 3000


const routes = {
    "/": "Curso de Express API",
    "/authors": "List of authors",
    "/books": "List of books",
}
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end(routes[req.url] || 'Ruta no encontrada')
})

server.listen(PORT, () => console.log('Running on http://localhost:3000/'))
