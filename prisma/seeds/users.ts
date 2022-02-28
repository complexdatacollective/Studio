import { Prisma, Role } from '@prisma/client';
import faker from '@faker-js/faker';

var cuid = require('cuid');

export interface UserWithId extends Prisma.UserCreateManyInput {
  id: string;
}

export const randomUser = (): UserWithId => ({
  id: cuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  image: faker.image.avatar(),
});

export const generateRandomUsers = (count: number): UserWithId[] => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(randomUser());
  }
  return users;
}
