import { type NextRequest, NextResponse } from 'next/server';
import { type Theme } from '~/lib/theme/constants';
import { getThemeData } from '~/lib/theme/utils';

export function GET(request: NextRequest) {
  const url = new URL(request.url);

  const theme = url.searchParams.get('theme') as Theme;
  // const forceDarkMode = url.searchParams.get('forceDarkMode') === 'yes';

  return NextResponse.json(getThemeData(theme ?? 'default'), { status: 200 });
}
