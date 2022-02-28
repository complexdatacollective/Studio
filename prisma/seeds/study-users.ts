import { Prisma, Role } from '@prisma/client';
import faker from '@faker-js/faker';

var cuid = require('cuid');

export interface StudyUserWithId extends Prisma.StudyUserCreateManyInput {
  id: string;
}

export const randomStudyUser = (userId: string, studyId: string): StudyUserWithId => ({
  id: cuid(),
  userId,
  studyId,
  role: faker.random.arrayElement(Object.values(Role)),
});

export const generateRandomStudyMembership = (userIds: string[], studyIds: string[]): StudyUserWithId[] => {
  const studyUsers: StudyUserWithId[] = [];
  for (let i = 0; i < userIds.length; i++) {
    const numberOfStudies = faker.datatype.number({
      min: 1,
      max: 5,
    });

    const studies = faker.random.arrayElements(studyIds, numberOfStudies);
    console.log('number', numberOfStudies, userIds[i], studies);
    studies.forEach(studyId => {
      studyUsers.push(randomStudyUser(userIds[i], studyId));
    });
  }

  return studyUsers;
}
