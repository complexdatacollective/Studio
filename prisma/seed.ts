import { AttributeTypes, Colors, EntityType, InputComponents, Prisma, PrismaClient, StageTypes } from '@prisma/client'
import { generateRandomOrganizations, OrganizationWithId } from './seeds/organizations';
import { generateRandomStudies, StudyWithId } from './seeds/studies';
import { generateRandomUsers, UserWithId } from './seeds/users';
import { generateRandomStudyMembership } from './seeds/study-users';
import cuid from 'cuid';

const prisma = new PrismaClient();

async function main() {

  console.log('Seeding organizations...');
  const organizations: OrganizationWithId[] = generateRandomOrganizations(1);
  const organizationIds: string[] = organizations.map(organization => organization.id);

  await prisma.organization.createMany({
    data: organizations,
    skipDuplicates: true, // Just incase randomOrganization() generates the same name
  });

  console.log('Seeding studies...');
  const studies: StudyWithId[] = generateRandomStudies(1, organizationIds);
  const studyIds: string[] = studies.map(study  => study.id);

  await prisma.study.createMany({
    data: studies,
    skipDuplicates: true, // Just incase randomStudy() generates the same name
  });

  console.log('Seeding protocols...');
  studyIds.forEach(async (studyId) => {
    const protocolId = cuid();

    console.log(`Seeding protocol ${protocolId} for study ${studyId}`);
    await prisma.protocol.create({
      data: {
        id: protocolId,
        studyId,
      }
    });

    console.log("Seeding protocol revisions...");
    const protocolRevisionId = cuid();
    await prisma.protocolRevision.create({
      data: {
        id: protocolRevisionId,
        name: 'My Protocol',
        description: 'This is my protocol',
        protocolId,
        entities: {
          create: [
            {
              name: 'Person',
              description: 'Node type representing a person',
              color: Colors.COLOR_1,
              type: EntityType.NODE,
              attributes: {
                create: [
                  {
                    id: cuid(),
                    name: 'name',
                    type: AttributeTypes.text,
                    validation: {},
                    component: InputComponents.TextInput,
                  },
                  {
                    id: cuid(),
                    name: 'age',
                    type: AttributeTypes.number,
                    validation: {},
                    component: InputComponents.NumberInput,
                  }
                ]
              },
            },
          ]
        },
        egoAttributes: {
          create: {
            id: cuid(),
            name: 'name',
            type: AttributeTypes.text,
            component: InputComponents.TextInput,
          },
        }
      }
    })

    console.log('Seeding stages...');
    await prisma.stage.createMany({
      data: [
        {
          id: cuid(),
          name: 'Pre-study',
          type: StageTypes.Information,
          protocolRevisionId: 1,
        },
        {
          id: cuid(),
          name: 'Post-study',
          type: StageTypes.Information,
          protocolRevisionId: 1,
        },
      ]
    });
  });

  console.log('Seeding Users...');
  const users: UserWithId[] = generateRandomUsers(1);
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

  console.log('Seeding ')
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

