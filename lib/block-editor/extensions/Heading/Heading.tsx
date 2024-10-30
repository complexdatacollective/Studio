import TiptapHeading from '@tiptap/extension-heading';
import { mergeAttributes } from '@tiptap/react';
import { headingVariants } from '~/components/typography/Heading';

type HeadingAttrs = {
  level: string;
};

export const Heading = TiptapHeading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const { level } = node.attrs as HeadingAttrs;
    const nodeLevel = parseInt(level, 10);

    const variant = this.options.levels.includes(nodeLevel)
      ? (`h${nodeLevel}` as 'h1' | 'h2' | 'h3' | 'h4')
      : 'h1';
    const classes = headingVariants({ variant });

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: classes,
      }),
      0,
    ];
  },
});

export default Heading;
