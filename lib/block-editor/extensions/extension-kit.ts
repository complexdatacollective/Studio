import { mergeAttributes } from '@tiptap/core';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Typography from '@tiptap/extension-typography';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from 'lucide-react';
import AutoJoiner from 'tiptap-extension-auto-joiner';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import { headingVariants } from '~/components/typography/Heading';
import { paragraphVariants } from '~/components/typography/Paragraph';
import { unorderedListClasses } from '~/components/typography/UnorderedList';
import { HorizontalRule } from './HorizontalRule';
import { ImageBlock } from './ImageBlock';
import { Link } from './Link';
import { Column, Columns } from './MultiColumn';
import { Selection } from './Selection';
import { SlashCommand } from './SlashCommand';

export const ExtensionKit = () => [
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    paragraph: false,
    text: false,
    bulletList: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
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
  BulletList.configure({
    HTMLAttributes: {
      class: unorderedListClasses,
    },
  }),
  GlobalDragHandle,
  AutoJoiner, // Recommended by GlobalDragHandle author. Allows merging nodes when dragging.
  Columns,
  Column,
  Selection,
  HorizontalRule,
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
  }),
  Underline,
  ImageBlock,
  Typography,
  SlashCommand,
  Dropcursor.configure({
    // Shows a placeholder for where dragged content will be inserted.
    width: 2,
    class: '',
  }),
];

export default ExtensionKit;
