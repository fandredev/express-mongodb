import Chance from 'chance';
import generateRandomId from '../../utils/generate-random-id';

const chance = new Chance();

export const mockAuthors = [{ name: chance.name() }, { name: chance.name() }];

export const mockAuthorsFound = [{ id: `_id${generateRandomId()}`, name: chance.name() }];

export const mockNewAuthor = { name: chance.name(), age: chance.age() };