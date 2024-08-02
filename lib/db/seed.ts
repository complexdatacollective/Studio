import { generateIdFromEntropySize } from 'lucia';
import { db } from '~/lib/db';

async function seed() {
  await db.user.upsert({
    where: {
      username: 'admin',
    },
    create: {
      id: generateIdFromEntropySize(10),
      username: 'admin',
      hashedPassword:
        '$argon2id$v=19$m=19456,t=2,p=1$RzFPa3uFTWobPp3+n7dWCg$vJUcxv0xkZqFmxn7bCuUr81KvZvMV5yYZ9Er0qvWDWU',
    },
    update: {},
  });

  const study = await db.study.create({
    data: {
      publicId: generateIdFromEntropySize(6),
      name: 'Sample Study',
      slug: 'sample-study',
      description: 'This is a sample study.',
      users: {
        create: {
          user: {
            connect: {
              username: 'admin',
            },
          },
          role: 'ADMIN',
        },
      },
    },
  });

  const protocol = await db.protocol.create({
    data: {
      publicId: 'protocol123',
      studyId: study.publicId,
      revisions: {
        create: [
          {
            revision: 1,
            name: 'First Revision',
            description: 'This is the first revision of the protocol.',
            stages: {
              create: [
                {
                  publicId: generateIdFromEntropySize(6),
                  name: 'Stage 1',
                  type: 'Information',
                },
                {
                  publicId: generateIdFromEntropySize(6),
                  name: 'Stage 2',
                  type: 'NameGenerator',
                },
              ],
            },
          },
        ],
      },
    },
  });

  const protocolRevision = await db.protocolRevision.findFirst({
    where: { protocolId: protocol.publicId },
  });

  if (!protocolRevision) {
    throw new Error('No protocol revision found');
  }

  await db.interview.create({
    data: {
      publicId: 'interview123',
      protocolRevisionId: protocolRevision.revision,
      startedAt: new Date(),
    },
  });
}

void seed();
