import { type Editor } from '@tiptap/react';
import { type EditorView } from 'prosemirror-view';

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
  type: 'paragraph' | 'h1' | 'h2' | 'h3' | 'h4' | 'bulletList',
) => {
  event.dataTransfer.setData('application/x-content-type', type);
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
                content: [{ type: 'text', text: ' ' }], // TODO: handle adding empty text without space
              },
            ],
          },
        ],
      },
    };

    editor.chain().focus().insertContentAt(pos.pos, contentMap[type]).run();

    return true;
  }
};
