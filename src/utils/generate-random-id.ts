import Chance from 'chance';

export default function generateRandomId() {
  const chance = new Chance();

  return chance.guid();
}
