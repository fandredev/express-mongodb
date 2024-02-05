import { author } from '../models/Author';
import AuthorController from './AuthorController';

import { StatusCodes } from 'http-status-codes';

import { requestMock, responseMock } from '../config/mocks/requests.mock';
import {
  mockAuthors,
  mockAuthorsFound,
  mockNewAuthor
} from '../config/mocks/authors.mock';
import generateRandomId from '../utils/generate-random-id';

describe('AuthorController:', () => {
  const randomId = `_id${generateRandomId()}`;

  it(`should return all authors and status ${StatusCodes.OK}`, async () => {
    const findCalledTimes = 1;
    author.find = jest.fn().mockResolvedValue(mockAuthors);

    await AuthorController.index(requestMock, responseMock);

    expect(author.find).toHaveBeenCalledTimes(findCalledTimes);
    expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(responseMock.json).toHaveBeenCalledWith(mockAuthors);
  });

  it(`should return a specific author and status ${StatusCodes.OK}`, async () => {
    const authorFound = [mockAuthorsFound];
    author.findById = jest.fn().mockResolvedValue(authorFound);

    requestMock.params = { randomId };

    await AuthorController.show(requestMock, responseMock);

    expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(responseMock.json).toHaveBeenCalledWith(authorFound);
  });

  it(`should return status ${StatusCodes.NOT_FOUND} when author is not found`, async () => {
    author.findById = jest.fn().mockResolvedValue(null);

    requestMock.params = { randomId };

    await AuthorController.show(requestMock, responseMock);

    expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
  });

  it(`should return status ${StatusCodes.INTERNAL_SERVER_ERROR} when an error occurs`, async () => {
    const errorMessage = 'Unable to find the author.';
    const error = new Error(errorMessage);
    author.findById = jest.fn().mockRejectedValue(error);

    requestMock.params = { randomId };

    await AuthorController.show(requestMock, responseMock);

    expect(responseMock.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(responseMock.json).toHaveBeenCalledWith({
      message: `${errorMessage} - Unable to find the author.`
    });
  });

  it(`should create a new author and return status ${StatusCodes.CREATED}`, async () => {
    const newAuthor = mockNewAuthor;
    author.create = jest.fn().mockResolvedValue(newAuthor);

    requestMock.body = newAuthor;

    await AuthorController.create(requestMock, responseMock);

    expect(author.create).toHaveBeenCalledWith(newAuthor);
    expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(responseMock.json).toHaveBeenCalledWith({
      message: 'Author created',
      newAuthor
    });
  });

  it(`should return status ${StatusCodes.INTERNAL_SERVER_ERROR} when an error occurs during author creation`, async () => {
    const errorMessage = 'Unable to register a author.';
    const error = new Error(errorMessage);
    author.create = jest.fn().mockRejectedValue(error);

    requestMock.body = mockNewAuthor;

    await AuthorController.create(requestMock, responseMock);

    expect(responseMock.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(responseMock.json).toHaveBeenCalledWith({
      message: `${errorMessage} - Unable to register a author.`
    });
  });

  it(`should update an author and return status ${StatusCodes.OK}`, async () => {
    const id = generateRandomId();
    const updatedAuthor = { name: 'Updated Author' };
    author.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    requestMock.params = { id };
    requestMock.body = updatedAuthor;

    await AuthorController.update(requestMock, responseMock);

    expect(author.findByIdAndUpdate).toHaveBeenCalledWith(id, updatedAuthor);
    expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(responseMock.json).toHaveBeenCalledWith({
      message: 'Author updated'
    });
  });

  it(`should return status ${StatusCodes.INTERNAL_SERVER_ERROR} when an error occurs during author update`, async () => {
    const id = generateRandomId();
    const updatedAuthor = { name: 'Updated Author' };
    const errorMessage = 'Unable to update the author.';
    const error = new Error(errorMessage);
    author.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

    requestMock.params = { id };
    requestMock.body = updatedAuthor;

    await AuthorController.update(requestMock, responseMock);

    expect(responseMock.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(responseMock.json).toHaveBeenCalledWith({
      message: `${errorMessage} - Unable to update the author.`
    });
  });

  it(`should delete an author and return status ${StatusCodes.OK}`, async () => {
    const id = generateRandomId();
    author.findByIdAndDelete = jest.fn();

    requestMock.params = { id };

    await AuthorController.destroy(requestMock, responseMock);

    expect(author.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(responseMock.json).toHaveBeenCalledWith({
      message: 'Author deleted'
    });
  });

  it(`should return status ${StatusCodes.INTERNAL_SERVER_ERROR} when an error occurs during author deletion`, async () => {
    const id = generateRandomId();
    const errorMessage = 'Unable to delete the author.';
    const error = new Error(errorMessage);
    author.findByIdAndDelete = jest.fn().mockRejectedValue(error);

    requestMock.params = { id };

    await AuthorController.destroy(requestMock, responseMock);

    expect(responseMock.status).toHaveBeenCalledWith(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(responseMock.json).toHaveBeenCalledWith({
      message: `${errorMessage} - Unable to delete the author.`
    });
  });
});
