import mongoose from 'mongoose';
import { author as authorModel } from './Author';
import AuthorBuilder from '../utils/builders/AuthorBuilder';
import 'dotenv/config';

describe('Author Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_ATLAS_CONNECTION as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await authorModel.deleteMany({});
  });

  it('should create a new author', async () => {
    const authorBuilder = new AuthorBuilder().build();

    const createdAuthor = await authorModel.create(authorBuilder);

    expect(createdAuthor.name).toBe(authorBuilder.name);
    expect(createdAuthor.nacionality).toBe(authorBuilder.nacionality);
  });

  it('should require the name field', async () => {
    const authorBuilder = new AuthorBuilder().withName('').build();

    try {
      await authorModel.create(authorBuilder);
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect((error as mongoose.Error.ValidationError).errors.name).toBeDefined();
    }
  });
});