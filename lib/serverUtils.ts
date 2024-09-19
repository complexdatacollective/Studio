'server only';

import { headers } from 'next/headers';

export function getCurrentPath(): string {
  const path = headers().get('x-current-path');

  if (!path) {
    throw new Error('No x-current-path found in headers');
  }

  return path;
}

export function getInterviewId(currentPath: string) {
  const match = currentPath.match(/^\/interview\/([^/]+)/);

  if (!match || !match[1]) {
    return undefined;
  }
  return match[1];
}
