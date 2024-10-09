import { z } from 'zod';

/**
 * List of all possible locales in the app. Both main locales and protocol
 * locales must reference items in this list.
 *
 * Potential sources of autoglossonym/autoglottonyms/glossonyms:
 *   - https://www.omniglot.com/language/names.htm
 *   - https://en.wikipedia.org/wiki/List_of_language_names
 */

export const SUPPORTED_LOCALE_OBJECTS = [
  { code: 'af', label: 'Afrikaans', native: 'Afrikaans' },
  { code: 'sq', label: 'Albanian', native: 'ʃc͡çip' },
  { code: 'am', label: 'Amharic', native: 'ኣማርኛ' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'ar-DZ', label: 'Arabic (Algeria)', native: 'دزيرية' },
  { code: 'ar-BH', label: 'Arabic (Bahrain)', native: '' },
  { code: 'ar-EG', label: 'Arabic (Egypt)', native: '' },
  { code: 'ar-IQ', label: 'Arabic (Iraq)', native: '' },
  { code: 'ar-JO', label: 'Arabic (Jordan)', native: '' },
  { code: 'ar-KW', label: 'Arabic (Kuwait)', native: '' },
  { code: 'ar-LB', label: 'Arabic (Lebanon)', native: '' },
  { code: 'ar-LY', label: 'Arabic (Libya)', native: '' },
  { code: 'ar-MA', label: 'Arabic (Morocco)', native: 'الدارجة' },
  { code: 'ar-OM', label: 'Arabic (Oman)', native: '' },
  { code: 'ar-QA', label: 'Arabic (Qatar)', native: '' },
  { code: 'ar-SA', label: 'Arabic (Saudi Arabia)', native: '' },
  {
    code: 'ar-SY',
    label: 'Arabic (Syria)',
    native: 'اللهجة العربيّة السورىّة',
  },
  { code: 'ar-TN', label: 'Arabic (Tunisia)', native: 'تونسي' },
  { code: 'ar-AE', label: 'Arabic (U.A.E.)', native: '' },
  { code: 'ar-YE', label: 'Arabic (Yemen)', native: '' },
  { code: 'eu', label: 'Basque', native: 'Euskara' },
  { code: 'be', label: 'Belarusian', native: 'Беларуская мова' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'bn-BD', label: 'Bengali (Bangladesh)', native: '' },
  { code: 'bn-IN', label: 'Bengali (India)', native: '' },
  { code: 'bg', label: 'Bulgarian', native: '' },
  { code: 'ca', label: 'Catalan', native: 'català' },
  { code: 'zh', label: 'Chinese', native: '' },
  { code: 'zh-HK', label: 'Chinese (Hong Kong)', native: '' },
  { code: 'zh-CN', label: 'Chinese (PRC)', native: '' },
  { code: 'zh-SG', label: 'Chinese (Singapore)', native: '' },
  { code: 'zh-TW', label: 'Chinese (Taiwan)', native: '' },
  { code: 'hr', label: 'Croatian', native: 'hrvatski' },
  { code: 'cs', label: 'Czech', native: '' },
  { code: 'da', label: 'Danish', native: 'dansk' },
  { code: 'nl', label: 'Dutch', native: 'Nederlands' },
  { code: 'nl-BE', label: 'Dutch (Belgium)', native: '' },
  { code: 'nl-NL', label: 'Dutch (Netherlands)', native: '' },
  { code: 'en', label: 'English', native: 'English' },
  {
    code: 'en-AU',
    label: 'English (Australia)',
    native: 'English (Australia)',
  },
  { code: 'en-BZ', label: 'English (Belize)', native: '' },
  { code: 'en-CA', label: 'English (Canada)', native: '' },
  { code: 'en-IE', label: 'English (Ireland)', native: '' },
  { code: 'en-JM', label: 'English (Jamaica)', native: '' },
  { code: 'en-NZ', label: 'English (New Zealand)', native: '' },
  {
    code: 'en-ZA',
    label: 'English (South Africa)',
    native: 'English (South Africa)',
  },
  { code: 'en-TT', label: 'English (Trinidad)', native: '' },
  {
    code: 'en-GB',
    label: 'English (United Kingdom)',
    native: 'English (United Kingdom)',
  },
  {
    code: 'en-US',
    label: 'English (United States)',
    native: 'English (United States)',
  },
  { code: 'et', label: 'Estonian', native: 'eesti keel' },
  { code: 'fo', label: 'Faeroese', native: '' },
  { code: 'fa', label: 'Farsi', native: 'فارسی' },
  { code: 'tl', label: 'Filipino', native: '' },
  { code: 'fi', label: 'Finnish', native: '' },
  { code: 'fr', label: 'French', native: '' },
  { code: 'fr-BE', label: 'French (Belgium)', native: '' },
  { code: 'fr-CA', label: 'French (Canada)', native: '' },
  { code: 'fr-FR', label: 'French (France)', native: '' },
  { code: 'fr-LU', label: 'French (Luxembourg)', native: '' },
  { code: 'fr-CH', label: 'French (Switzerland)', native: '' },
  { code: 'gd', label: 'Gaelic (Scotland)', native: '' },
  { code: 'de', label: 'German', native: '' },
  { code: 'de-AT', label: 'German (Austria)', native: '' },
  { code: 'de-DE', label: 'German (Germany)', native: '' },
  { code: 'de-LI', label: 'German (Liechtenstein)', native: '' },
  { code: 'de-LU', label: 'German (Luxembourg)', native: '' },
  { code: 'de-CH', label: 'German (Switzerland)', native: '' },
  { code: 'el', label: 'Greek', native: '' },
  { code: 'gu', label: 'Gujarati', native: '' },
  { code: 'ha', label: 'Hausa', native: '' },
  { code: 'he', label: 'Hebrew', native: '' },
  { code: 'hi', label: 'Hindi', native: '' },
  { code: 'hu', label: 'Hungarian', native: '' },
  { code: 'is', label: 'Icelandic', native: '' },
  { code: 'ig', label: 'Igbo', native: '' },
  { code: 'id', label: 'Indonesian', native: '' },
  { code: 'ga', label: 'Irish', native: '' },
  { code: 'it', label: 'Italian', native: '' },
  { code: 'it-CH', label: 'Italian (Switzerland)', native: '' },
  { code: 'ja', label: 'Japanese', native: '' },
  { code: 'ko', label: 'Korean', native: '' },
  { code: 'ku', label: 'Kurdish', native: '' },
  { code: 'lv', label: 'Latvian', native: '' },
  { code: 'lt', label: 'Lithuanian', native: '' },
  { code: 'mk', label: 'Macedonian (FYROM)', native: '' },
  { code: 'ml', label: 'Malayalam', native: '' },
  { code: 'ms', label: 'Malaysian', native: '' },
  { code: 'mt', label: 'Maltese', native: '' },
  { code: 'mo', label: 'Moldavian', native: '' },
  { code: 'no', label: 'Norwegian', native: '' },
  { code: 'nb', label: 'Norwegian (Bokmål)', native: '' },
  { code: 'nn', label: 'Norwegian (Nynorsk)', native: '' },
  { code: 'ps', label: 'Pashto', native: '' },
  { code: 'pl', label: 'Polish', native: '' },
  { code: 'pt', label: 'Portuguese', native: '' },
  { code: 'pt-BR', label: 'Portuguese (Brazil)', native: '' },
  { code: 'pt-PT', label: 'Portuguese (Portugal)', native: '' },
  { code: 'pa', label: 'Punjabi', native: '' },
  { code: 'ro', label: 'Romanian', native: '' },
  { code: 'ro-MD', label: 'Romanian (Republic of Moldova)', native: '' },
  { code: 'ru', label: 'Russian', native: '' },
  { code: 'ru-MD', label: 'Russian (Republic of Moldova)', native: '' },
  { code: 'sr', label: 'Serbian', native: '' },
  { code: 'st', label: 'Sesotho', native: '' },
  { code: 'sk', label: 'Slovak', native: '' },
  { code: 'sl', label: 'Slovenian', native: '' },
  { code: 'sb', label: 'Sorbian', native: '' },
  { code: 'es', label: 'Spanish', native: '' },
  { code: 'es-AR', label: 'Spanish (Argentina)', native: '' },
  { code: 'es-BO', label: 'Spanish (Bolivia)', native: '' },
  { code: 'es-CL', label: 'Spanish (Chile)', native: '' },
  { code: 'es-CO', label: 'Spanish (Colombia)', native: '' },
  { code: 'es-CR', label: 'Spanish (Costa Rica)', native: '' },
  { code: 'es-DO', label: 'Spanish (Dominican Republic)', native: '' },
  { code: 'es-EC', label: 'Spanish (Ecuador)', native: '' },
  { code: 'es-SV', label: 'Spanish (El Salvador)', native: '' },
  { code: 'es-GT', label: 'Spanish (Guatemala)', native: '' },
  { code: 'es-HN', label: 'Spanish (Honduras)', native: '' },
  { code: 'es-LA', label: 'Spanish (Latin America)', native: '' },
  { code: 'es-MX', label: 'Spanish (Mexico)', native: '' },
  { code: 'es-NI', label: 'Spanish (Nicaragua)', native: '' },
  { code: 'es-PA', label: 'Spanish (Panama)', native: '' },
  { code: 'es-PY', label: 'Spanish (Paraguay)', native: '' },
  { code: 'es-PE', label: 'Spanish (Peru)', native: '' },
  { code: 'es-PR', label: 'Spanish (Puerto Rico)', native: '' },
  { code: 'es-ES', label: 'Spanish (Spain)', native: '' },
  { code: 'es-US', label: 'Spanish (United States)', native: '' },
  { code: 'es-UY', label: 'Spanish (Uruguay)', native: '' },
  { code: 'es-VE', label: 'Spanish (Venezuela)', native: '' },
  { code: 'so', label: 'Somali', native: '' },
  { code: 'sx', label: 'Sutu', native: '' },
  { code: 'sw', label: 'Swahili', native: '' },
  { code: 'sw-KE', label: 'Swahili (Kenya)', native: '' },
  { code: 'sw-TZ', label: 'Swahili (Tanzania)', native: '' },
  { code: 'sv', label: 'Swedish', native: '' },
  { code: 'sv-FI', label: 'Swedish (Finland)', native: '' },
  { code: 'ta', label: 'Tamil', native: '' },
  { code: 'ta-IN', label: 'Tamil (India)', native: '' },
  { code: 'ta-LK', label: 'Tamil (Sri Lanka)', native: '' },
  { code: 'th', label: 'Thai', native: '' },
  { code: 'ti', label: 'Tigrinya', native: '' },
  { code: 'ts', label: 'Tsonga', native: '' },
  { code: 'tn', label: 'Tswana', native: '' },
  { code: 'tr', label: 'Turkish', native: '' },
  { code: 'uk', label: 'Ukrainian', native: '' },
  { code: 'ur', label: 'Urdu', native: '' },
  { code: 'ur-IN', label: 'Urdu (India)', native: '' },
  { code: 'ur-PK', label: 'Urdu (Pakistan)', native: '' },
  { code: 'uz', label: 'Uzbek', native: '' },
  { code: 've', label: 'Venda', native: '' },
  { code: 'vi', label: 'Vietnamese', native: '' },
  { code: 'cy', label: 'Welsh', native: '' },
  { code: 'xh', label: 'Xhosa', native: 'isiXhosa' },
  { code: 'ji', label: 'Yiddish', native: '' },
  { code: 'yo', label: 'Yoruba', native: '' },
  { code: 'zu', label: 'Zulu', native: 'isiZulu' },
] as const;

export type LocaleObject = (typeof SUPPORTED_LOCALE_OBJECTS)[number];

const SUPPORTED_LOCALES = SUPPORTED_LOCALE_OBJECTS.map(({ code }) => code);
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const SupportedLocaleSchema = z.enum([
  SUPPORTED_LOCALES[0]!,
  ...SUPPORTED_LOCALES.slice(0),
]);

/**
 * The protocol contains localised messages for both the protocol itself and the
 * interview.
 */
export const ProtocolMessagesSchema = z.object({
  Protocol: z.object({
    Panels: z.record(z.string()).optional(),
    Prompts: z.record(z.string(), z.string()).optional(),
  }),
  Interview: z
    .object({
      Wizards: z.object({
        General: z.object({
          Name: z.string().optional(),
          Description: z.string().optional(),
          Steps: z.object({
            Welcome: z
              .object({
                Title: z.string(),
                Text: z.string(),
              })
              .optional(),
            Overview: z
              .object({
                Title: z.string(),
                Text: z.string(),
              })
              .optional(),
            Summary: z
              .object({
                Title: z.string(),
                Text: z.string(),
              })
              .optional(),
          }),
        }),
      }),
    })
    .optional(),
});

export const LocalisedMessagesWithDefaultsSchema = z.record(
  SupportedLocaleSchema,
  ProtocolMessagesSchema,
);

export type ProtocolMessages = z.infer<typeof ProtocolMessagesSchema>;
