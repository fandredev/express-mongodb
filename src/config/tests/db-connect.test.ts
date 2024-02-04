import mongoose from 'mongoose';
import 'dotenv/config';

describe('Testing the database connection', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb+srv://admin:uKGjBrslVituB2ZY@cluster0.i7lwyms.mongodb.net/bookstore?retryWrites=true&w=majority');
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('should be check mongoose connection is \'connect\' when beforeEach is called', async () => {
    expect(await mongoose.connection.readyState).toBe(1);
  });
});
