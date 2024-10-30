import { mergeAttributes } from '@tiptap/core';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import { headingVariants } from '~/components/typography/Heading';
import { paragraphVariants } from '~/components/typography/Paragraph';
import { Document } from './Document';

export const ExtensionKit = () => [
  Document,
  Heading.extend({
    levels: [1, 2, 3, 4],
    renderHTML({ node, HTMLAttributes }) {
      type HeadingAttrs = {
        level: string;
      };

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
  }).configure({ levels: [1, 2, 3, 4] }),
  Paragraph.configure({
    HTMLAttributes: {
      class: paragraphVariants(),
    },
  }),
  Text,
  GlobalDragHandle,
  // Columns,
  // TaskList,
  // TaskItem.configure({
  //   nested: true,
  // }),
  // Column,
  // Selection,
  // Heading.configure({
  //   levels: [1, 2, 3, 4, 5, 6],
  // }),
  // HorizontalRule,
  // StarterKit.configure({
  //   document: false,
  //   dropcursor: false,
  //   heading: false,
  //   horizontalRule: false,
  //   blockquote: false,
  //   history: false,
  //   codeBlock: false,
  // }),
  // CodeBlock,
  // TextStyle,
  // FontSize,
  // FontFamily,
  // Color,
  // TrailingNode,
  // Link.configure({
  //   openOnClick: false,
  // }),
  // Highlight.configure({ multicolor: true }),
  // Underline,
  // CharacterCount.configure({ limit: 50000 }),
  // ImageBlock,
  // TextAlign.extend({
  //   addKeyboardShortcuts() {
  //     return {};
  //   },
  // }).configure({
  //   types: ['heading', 'paragraph'],
  // }),
  // Subscript,
  // Superscript,
  // Table,
  // TableCell,
  // TableHeader,
  // TableRow,
  // Typography,
  // Placeholder.configure({
  //   includeChildren: true,
  //   showOnlyCurrent: false,
  //   placeholder: () => '',
  // }),
  // SlashCommand,
  // Focus,
  // Figcaption,
  // BlockquoteFigure,
  // Dropcursor.configure({
  //   width: 2,
  //   class: 'ProseMirror-dropcursor border-black',
  // }),
];

export default ExtensionKit;
