'use server';

import { cookies } from 'next/headers';
import { DARK_MODE_COOKIE_NAME, THEME_COOKIE_NAME } from './constants';
import { revalidatePath } from 'next/cache';

export async function updateTheme(form: FormData) {
  console.log(form);

  cookies().set(THEME_COOKIE_NAME, form.get('theme') as string, {
    maxAge: 1704085200,
  });

  cookies().set(
    DARK_MODE_COOKIE_NAME,
    form.get('force-dark-mode') == 'on' ? 'yes' : 'no',
    { maxAge: 1704085200 },
  );

  revalidatePath('/api/theme');
}
