import Chance from 'chance';

const chance = new Chance();

export const mockAuthors = [{ name: chance.name() }, { name: chance.name() }];