export type TiptapContent =
  | 'paragraph'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bulletList'
  | 'group'
  | 'variable';

export const contentMap = {
  paragraph: { type: 'paragraph' },
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
