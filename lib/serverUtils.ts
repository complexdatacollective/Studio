'server only';

import { headers } from 'next/headers';

export function getCurrentPath(): string {
  const path = headers().get('x-current-path');

  if (!path) {
    throw new Error('No x-current-path found in headers');
  }

  return path;
}

export function getInterviewId(): string {
  const path = getCurrentPath();

  const match = path.match(/^\/interview\/([^/]+)/);

  if (!match) {
    throw new Error('No interview ID found in path');
  }

  if (!match[1]) {
    throw new Error('No interview ID found in path');
  }

  return match[1];
}
