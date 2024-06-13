import dotenv from 'dotenv';
dotenv.config();

/* eslint-disable no-process-env */
import { execSync } from 'child_process';

// Always run prisma generate
execSync('npx prisma generate', { stdio: 'inherit' });

// Only run prisma db push if VERCEL_ENV is production or NODE_ENV is development
if (
  process.env.VERCEL_ENV === 'production' ||
  process.env.NODE_ENV === 'development'
) {
  execSync('npx prisma db push --force-reset', { stdio: 'inherit' });
}
