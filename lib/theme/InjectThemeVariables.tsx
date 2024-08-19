/**
 * A component that provides CSS variables based on a theme. Used to dynamically
 * change the theme of the application, since the CSS variables are used in the
 * tailwind.config.js file.
 *
 * This takes advantage of the hoisting capabilities of React 19 to dynamically
 * import a stylesheet and have it applied to the document. Should mean that
 * when a component that renders this is loaded, the theme will be applied, and
 * when it is removed, the theme will be removed.
 *
 * Further thoughts:
 *   - This requires CSS files for themes to be stored in the public folder.
 *   - In future, these values could come from a database, which would allow
 *     for full user customisation
 *   - The values could be applied using the style attribute of a div, which
 *     would allow for tighter scoping.
 *   - We need to think of a way to validate that a theme contains all the
 *     semantic tokens, that there are no spelling mistakes etc. Unsure how to
 *     do this yet.
 */

export default function InjectThemeVariables({ theme }: { theme: string }) {
  const url = `/themes/${theme}.css`;

  return <link rel="stylesheet" href={url} />;
}
