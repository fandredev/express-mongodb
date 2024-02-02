import moongose from 'mongoose'

export default async function connectDatabase() {
  const uri = process.env.MONGO_DB_ATLAS_CONNECTION

  await moongose.connect(uri) // Connect to the database
  return moongose.connection; // Return the connection
}


const database = await connectDatabase()
database.on('error', (error) => console.log(`Error connecting to the database: ${error}`))
database.once('open', () => console.log(`Connected to the database`))
