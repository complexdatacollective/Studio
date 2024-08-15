'use server';

import { cookies } from 'next/headers';
import {
  DARK_MODE_COOKIE_NAME,
  THEME_COOKIE_NAME,
  ThemesSchema,
} from './constants';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

const schema = zfd.formData(
  z.object({
    'theme': ThemesSchema,
    // Todo: how do I validate this with DarkModeSchema?
    'force-dark-mode': zfd.checkbox().optional(),
  }),
);

export async function updateTheme(form: FormData) {
  const { theme, 'force-dark-mode': forceDarkMode } = schema.parse(form);

  cookies().set(THEME_COOKIE_NAME, theme, {
    maxAge: 1704085200,
  });

  cookies().set(DARK_MODE_COOKIE_NAME, forceDarkMode ? 'on' : 'off', {
    maxAge: 1704085200,
  });

  // revalidatePath('/api/theme');
}
