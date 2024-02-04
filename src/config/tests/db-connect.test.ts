import mongoose from 'mongoose';
import 'dotenv/config';

describe('Testing the database connection', () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_DB_ATLAS_CONNECTION as string);
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('should be check mongoose connection is \'connect\' when beforeEach is called', async () => {
    expect(await mongoose.connection.readyState).toBe(1);
  });
});
