'server only';

import { headers } from 'next/headers';

export async function getCurrentPath(): Promise<string> {
  const h = await headers();
  const path = h.get('x-current-path');

  if (!path) {
    throw new Error('No x-current-path found in headers');
  }

  return path;
}

export function getInterviewId(currentPath: string) {
  const match = currentPath.match(/^\/interview\/([^/]+)/);

  if (!match?.[1]) {
    return undefined;
  }

  return match[1];
}
