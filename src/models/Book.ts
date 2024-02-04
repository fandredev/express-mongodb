import moongose from 'mongoose';
import { authorSchema } from './Author.js';

// Criando um Schema para o livro

const bookSchema = new moongose.Schema({
  id: {
    type: moongose.Schema.Types.ObjectId
  }, title: {
    type: String, required: true
  }, editor: {
    type: String
  }, price: {
    type: Number
  }, number_of_pages: {
    type: Number
  },
  author: authorSchema
}, { versionKey: false });

// Criando um modelo para o livro
const book = moongose.model('books', bookSchema);

export default book;
