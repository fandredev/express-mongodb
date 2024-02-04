import { Request, Response } from 'express';

export const requestMock = {} as Request;
export const responseMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
} as unknown as Response;