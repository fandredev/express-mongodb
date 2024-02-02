import moongose from 'mongoose'

export default async function connectDatabase() {
  const uri = "mongodb+srv://admin:uKGjBrslVituB2ZY@cluster0.i7lwyms.mongodb.net/bookstore?retryWrites=true&w=majority";

  await moongose.connect(uri) // Connect to the database
  return moongose.connection; // Return the connection
}


const database = await connectDatabase()
database.on('error', (error) => console.log(`Error connecting to the database: ${error}`))
database.once('open', () => console.log(`Connected to the database`))
