import { Prisma, PrismaClient, StageTypes } from '@prisma/client'
import { generateRandomOrganizations, OrganizationWithId } from './seeds/organizations';
import { generateRandomStudies, StudyWithId } from './seeds/studies';
import { generateRandomUsers, UserWithId } from './seeds/users';
import { generateRandomStudyMembership } from './seeds/study-users';
import cuid from 'cuid';

const prisma = new PrismaClient();

async function main() {

  console.log('Seeding organizations...');
  const organizations: OrganizationWithId[] = generateRandomOrganizations(10);
  const organizationIds: string[] = organizations.map(organization => organization.id);

  await prisma.organization.createMany({
    data: organizations,
    skipDuplicates: true, // Just incase randomOrganization() generates the same name
  });

  console.log(organizationIds);

  console.log('Seeding studies...');
  const studies: StudyWithId[] = generateRandomStudies(100, organizationIds);
  const studyIds: string[] = studies.map(study  => study.id);

  await prisma.study.createMany({
    data: studies,
    skipDuplicates: true, // Just incase randomStudy() generates the same name
  });

  console.log('Seeding protocols...');
  studyIds.forEach(async (studyId) => {
    const protocolId = cuid();

    const stages = [];

    for (let i = 0; i < 10; i++) {
      stages.push({
        name: `Stage ${i}`,
        type: StageTypes.Information,
        protocolId: protocolId,
      })
    }

    await prisma.protocol.create({
      data: {
        id: protocolId,
        studyId,
        name: 'Protocol 1',
        description: 'This is protocol 1',
      }
    });

    await prisma.stage.createMany({
      data: stages,
    });
  });

  console.log('Seeding Users...');
  const users: UserWithId[] = generateRandomUsers(1000);
  const userIds = users.map(user => user.id);

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true, // Just incase randomUser() generates the same name
  });

  console.log('Seeding studyUsers...');
  const studyUsers = generateRandomStudyMembership(userIds, studyIds);

  await prisma.studyUser.createMany({
    data: studyUsers,
    skipDuplicates: true,
  });

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

