import { author } from '../models/Author';
import AuthorController from './AuthorController';

import { StatusCodes } from 'http-status-codes';

import { requestMock, responseMock } from '../config/mocks/requests.mock';
import { mockAuthors } from '../config/mocks/authors.mock';

describe('AuthorController:', () => {
  it(`should return all authors and status ${StatusCodes.OK}`, async () => {
    const findCalledTimes = 1;
    author.find = jest.fn().mockResolvedValue(mockAuthors);

    await AuthorController.index(requestMock, responseMock);

    expect(author.find).toHaveBeenCalledTimes(findCalledTimes);
    expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(responseMock.json).toHaveBeenCalledWith(mockAuthors);
  });
});