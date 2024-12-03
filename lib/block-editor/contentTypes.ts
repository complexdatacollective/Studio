import type { Content } from '@tiptap/react';

export type TiptapContent =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'paragraph'
  | 'bulletList'
  | 'group'
  | 'variable';

export const contentMap: Record<string, Content> = {
  h1: {
    type: 'heading',
    attrs: { level: 1 },
  },
  h2: {
    type: 'heading',
    attrs: { level: 2 },
  },
  h3: {
    type: 'heading',
    attrs: { level: 3 },
  },
  h4: {
    type: 'heading',
    attrs: { level: 4 },
  },
  paragraph: { type: 'paragraph' },
  bulletList: {
    type: 'bulletList',
    content: [
      {
        type: 'listItem',
        content: [
          {
            type: 'paragraph',
          },
        ],
      },
    ],
  },
  group: {
    type: 'group',
    attrs: { columns: 1 },
    content: [],
  },
};
