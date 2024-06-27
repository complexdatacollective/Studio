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
  await db.study.upsert({
    where: {
      publicId: 'nc',
    },
    create: {
      publicId: 'nc',
      name: 'Network Canvas',
      slug: 'network-canvas',
      users: {
        create: {
          role: 'ADMIN',
          user: {
            connect: {
              username: 'admin',
            },
          },
        },
      },
    },
    update: {},
  });
}

void seed();
