'server only';

import { headers } from 'next/headers';

export function getServerPath(): string {
  const headerList = headers();
  const path = headerList.get('x-current-path');

  if (!path) {
    throw new Error('No x-current-path found in headers');
  }

  return path;
}
