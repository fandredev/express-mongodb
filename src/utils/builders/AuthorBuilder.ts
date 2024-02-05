import Chance from 'chance';

interface AuthorProps {
  name: string;
  nacionality: string
}

interface AuthorBuilderInterface {
  withName(name: string): AuthorBuilder;
  withNacionality(nacionality: string): AuthorBuilder;
  build(): AuthorProps;
}

export default class AuthorBuilder implements AuthorBuilderInterface {
  private name: string;
  private nacionality: string;
  private readonly chance = new Chance();

  constructor() {
    this.name = this.chance.name();
    this.nacionality = 'brazilian';
  }

  public withName(name: string): AuthorBuilder {
    this.name = name;
    return this;
  }

  public withNacionality(nacionality: string): AuthorBuilder {
    this.nacionality = nacionality;
    return this;
  }

  public build() : AuthorProps{
    return {
      name: this.name,
      nacionality: this.nacionality
    };
  }
}