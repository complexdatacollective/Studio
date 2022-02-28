import { Prisma } from '@prisma/client';
import faker from '@faker-js/faker';

var cuid = require('cuid');

export interface StudyWithId extends Prisma.StudyCreateManyInput {
  id: string;
}

export const randomStudy = (organizationIds: string[]): StudyWithId => ({
  id: cuid(),
  name: `Investigation of  ${faker.commerce.productName()}`,
  description: faker.commerce.productDescription(),
  organizationId: faker.random.arrayElement(organizationIds)
});


export const generateRandomStudies = (number: Number, organizationIds: string[]): StudyWithId[] => {
  const studies = [];
  for (let i = 0; i < number; i++) {
    studies.push(randomStudy(organizationIds));
  }
  return studies;
}
