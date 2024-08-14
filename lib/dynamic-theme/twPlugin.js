import { makeVariable, shades } from "./common";
import { consistentChroma, highestChroma } from "./runtime";

export function dynamicTwClasses(baseName, baseHue) {
  return Object.fromEntries(
    shades.map((shade, i) => {
      // const color = consistentChroma(i, baseHue);
      const color = highestChroma(i, baseHue);

      return [
        shade,
        `oklch(${makeVariable({
          fallbackValue: color,
          name: baseName,
          shade,
          withVar: true,
        })} / <alpha-value>)`,
      ];
    }),
  );
}
