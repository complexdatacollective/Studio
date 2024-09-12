export const LOCALES_DICT = [
  ['af', 'Afrikaans'],
  ['sq', 'Albanian'],
  ['am', 'Amharic'],
  ['ar', 'Arabic'],
  ['ar-dz', 'Arabic (Algeria)'],
  ['ar-bh', 'Arabic (Bahrain)'],
  ['ar-eg', 'Arabic (Egypt)'],
  ['ar-iq', 'Arabic (Iraq)'],
  ['ar-jo', 'Arabic (Jordan)'],
  ['ar-kw', 'Arabic (Kuwait)'],
  ['ar-lb', 'Arabic (Lebanon)'],
  ['ar-ly', 'Arabic (Libya)'],
  ['ar-ma', 'Arabic (Morocco)'],
  ['ar-om', 'Arabic (Oman)'],
  ['ar-qa', 'Arabic (Qatar)'],
  ['ar-sa', 'Arabic (Saudi Arabia)'],
  ['ar-sy', 'Arabic (Syria)'],
  ['ar-tn', 'Arabic (Tunisia)'],
  ['ar-ae', 'Arabic (U.A.E.)'],
  ['ar-ye', 'Arabic (Yemen)'],
  ['eu', 'Basque'],
  ['be', 'Belarusian'],
  ['bn', 'Bengali'],
  ['bn-BD', 'Bengali (Bangladesh)'],
  ['bn-IN', 'Bengali (India)'],
  ['bg', 'Bulgarian'],
  ['ca', 'Catalan'],
  ['zh', 'Chinese'],
  ['zh-hk', 'Chinese (Hong Kong)'],
  ['zh-cn', 'Chinese (PRC)'],
  ['zh-sg', 'Chinese (Singapore)'],
  ['zh-tw', 'Chinese (Taiwan)'],
  ['hr', 'Croatian'],
  ['cs', 'Czech'],
  ['da', 'Danish'],
  ['nl', 'Dutch'],
  ['nl-BE', 'Dutch (Belgium)'],
  ['nl-NL', 'Dutch (Netherlands)'],
  ['en', 'English'],
  ['en-au', 'English (Australia)'],
  ['en-bz', 'English (Belize)'],
  ['en-ca', 'English (Canada)'],
  ['en-ie', 'English (Ireland)'],
  ['en-jm', 'English (Jamaica)'],
  ['en-nz', 'English (New Zealand)'],
  ['en-za', 'English (South Africa)'],
  ['en-tt', 'English (Trinidad)'],
  ['en-gb', 'English (United Kingdom)'],
  ['en-us', 'English (United States)'],
  ['et', 'Estonian'],
  ['fo', 'Faeroese'],
  ['fa', 'Farsi'],
  ['tl', 'Filipino'],
  ['fi', 'Finnish'],
  ['fr', 'French'],
  ['fr-be', 'French (Belgium)'],
  ['fr-ca', 'French (Canada)'],
  ['fr-FR', 'French (France)'],
  ['fr-lu', 'French (Luxembourg)'],
  ['fr-ch', 'French (Switzerland)'],
  ['gd', 'Gaelic (Scotland)'],
  ['de', 'German'],
  ['de-at', 'German (Austria)'],
  ['de-DE', 'German (Germany)'],
  ['de-li', 'German (Liechtenstein)'],
  ['de-lu', 'German (Luxembourg)'],
  ['de-CH', 'German (Switzerland)'],
  ['el', 'Greek'],
  ['gu', 'Gujarati'],
  ['ha', 'Hausa'],
  ['he', 'Hebrew'],
  ['hi', 'Hindi'],
  ['hu', 'Hungarian'],
  ['is', 'Icelandic'],
  ['ig', 'Igbo'],
  ['id', 'Indonesian'],
  ['ga', 'Irish'],
  ['it', 'Italian'],
  ['it-ch', 'Italian (Switzerland)'],
  ['ja', 'Japanese'],
  ['ko', 'Korean'],
  ['ku', 'Kurdish'],
  ['lv', 'Latvian'],
  ['lt', 'Lithuanian'],
  ['mk', 'Macedonian (FYROM)'],
  ['ml', 'Malayalam'],
  ['ms', 'Malaysian'],
  ['mt', 'Maltese'],
  ['no', 'Norwegian'],
  ['nb', 'Norwegian (Bokmål)'],
  ['nn', 'Norwegian (Nynorsk)'],
  ['ps', 'Pashto'],
  ['pl', 'Polish'],
  ['pt', 'Portuguese'],
  ['pt-BR', 'Portuguese (Brazil)'],
  ['pt-PT', 'Portuguese (Portugal)'],
  ['pa', 'Punjabi'],
  ['ro', 'Romanian'],
  ['ro-md', 'Romanian (Republic of Moldova)'],
  ['ru', 'Russian'],
  ['ru-md', 'Russian (Republic of Moldova)'],
  ['sr', 'Serbian'],
  ['st', 'Sesotho'],
  ['sk', 'Slovak'],
  ['sl', 'Slovenian'],
  ['sb', 'Sorbian'],
  ['es', 'Spanish'],
  ['es-ar', 'Spanish (Argentina)'],
  ['es-bo', 'Spanish (Bolivia)'],
  ['es-cl', 'Spanish (Chile)'],
  ['es-co', 'Spanish (Colombia)'],
  ['es-cr', 'Spanish (Costa Rica)'],
  ['es-do', 'Spanish (Dominican Republic)'],
  ['es-ec', 'Spanish (Ecuador)'],
  ['es-sv', 'Spanish (El Salvador)'],
  ['es-gt', 'Spanish (Guatemala)'],
  ['es-hn', 'Spanish (Honduras)'],
  ['es-LA', 'Spanish (Latin America)'],
  ['es-MX', 'Spanish (Mexico)'],
  ['es-ni', 'Spanish (Nicaragua)'],
  ['es-pa', 'Spanish (Panama)'],
  ['es-py', 'Spanish (Paraguay)'],
  ['es-pe', 'Spanish (Peru)'],
  ['es-pr', 'Spanish (Puerto Rico)'],
  ['es-ES', 'Spanish (Spain)'],
  ['es-US', 'Spanish (United States)'],
  ['es-uy', 'Spanish (Uruguay)'],
  ['es-ve', 'Spanish (Venezuela)'],
  ['so', 'Somali'],
  ['sx', 'Sutu'],
  ['sw', 'Swahili'],
  ['sw-KE', 'Swahili (Kenya)'],
  ['sw-TZ', 'Swahili (Tanzania)'],
  ['sv', 'Swedish'],
  ['sv-fi', 'Swedish (Finland)'],
  ['ta', 'Tamil'],
  ['ta-IN', 'Tamil (India)'],
  ['ta-LK', 'Tamil (Sri Lanka)'],
  ['th', 'Thai'],
  ['ti', 'Tigrinya'],
  ['ts', 'Tsonga'],
  ['tn', 'Tswana'],
  ['tr', 'Turkish'],
  ['uk', 'Ukrainian'],
  ['ur', 'Urdu'],
  ['ur-IN', 'Urdu (India)'],
  ['ur-PK', 'Urdu (Pakistan)'],
  ['uz', 'Uzbek'],
  ['ve', 'Venda'],
  ['vi', 'Vietnamese'],
  ['cy', 'Welsh'],
  ['xh', 'Xhosa'],
  ['ji', 'Yiddish'],
  ['yo', 'Yoruba'],
  ['zu', 'Zulu'],
] as const;

export const SUPPORTED_LOCALES = LOCALES_DICT.map(([code]) => code);

export type Locale = (typeof SUPPORTED_LOCALES)[number];
