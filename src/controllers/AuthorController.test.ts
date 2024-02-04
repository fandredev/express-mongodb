import { author } from '../models/Author';
import AuthorController from './AuthorController';

import { requestMock, responseMock } from '../config/mocks/requests.mock';
import { mockAuthors  } from '../config/mocks/authors.mock';

describe('AuthorController:', () => {
  it('should return all authors and status 200', async () => {
    author.find = jest.fn().mockResolvedValue(mockAuthors);

    await AuthorController.index(requestMock, responseMock);

    expect(author.find).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.json).toHaveBeenCalledWith(mockAuthors);
  });
});