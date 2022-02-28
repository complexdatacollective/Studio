import { Prisma } from '@prisma/client';
import faker from '@faker-js/faker';

var cuid = require('cuid');

export interface OrganizationWithId extends Prisma.OrganizationCreateInput {
  id: string;
}

export const randomOrganization = ():OrganizationWithId => ({
  id: cuid(),
  name: `University of ${faker.address.direction()} ${faker.address.state()}`,
  description: faker.company.bs(),
  image: faker.image.business(),
});

export const generateRandomOrganizations = (number: Number):OrganizationWithId[] => {
  const organizations = [];
  for (let i = 0; i < number; i++) {
    organizations.push(randomOrganization());
  }
  return organizations;
}

