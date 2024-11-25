import { type Editor } from '@tiptap/react';
import { type EditorView } from 'prosemirror-view';
import type { TVariableDefinition } from '~/schemas/protocol/variables';
import { handleVariableDrop } from './extensions/Variable/utils';

export const getRenderContainer = (editor: Editor, nodeType: string) => {
  const {
    view,
    state: {
      selection: { from },
    },
  } = editor;

  const elements = document.querySelectorAll('.has-focus');
  const elementCount = elements.length;
  const innermostNode = elements[elementCount - 1];
  const element = innermostNode;

  if (
    (element?.getAttribute('data-type') &&
      element.getAttribute('data-type') === nodeType) ??
    element?.classList?.contains(nodeType)
  ) {
    return element;
  }

  const node = view.domAtPos(from).node as HTMLElement;
  let container: HTMLElement | null = node;

  if (!container.tagName) {
    container = node.parentElement;
  }

  while (
    container &&
    !(
      container.getAttribute('data-type') &&
      container.getAttribute('data-type') === nodeType
    ) &&
    !container.classList.contains(nodeType)
  ) {
    container = container.parentElement;
  }

  return container;
};

export const handleDrag = (
  event: React.DragEvent<HTMLDivElement>,
  type:
    | 'paragraph'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'bulletList'
    | 'group'
    | 'variable',
  data?: TVariableDefinition | null,
  key?: string,
) => {
  event.dataTransfer.setData('application/x-content-type', type);

  // If it's a variable, add key and data
  if (type === 'variable' && data && key) {
    event.dataTransfer.setData('application/json', JSON.stringify(data));
    event.dataTransfer.setData('application/x-variable-key', key);
  }
};

export const handleDrop = (
  view: EditorView,
  event: React.DragEvent,
  editor: Editor,
) => {
  const type = event.dataTransfer.getData('application/x-content-type');
  const pos = view.posAtCoords({
    left: event.clientX,
    top: event.clientY,
  });

  if (pos && editor) {
    const contentMap = {
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

    if (type === 'variable') {
      handleVariableDrop(view, event);
    } else
      editor.chain().focus().insertContentAt(pos.pos, contentMap[type]).run();

    return true;
  }
};
