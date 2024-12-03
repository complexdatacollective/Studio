import { type Editor } from '@tiptap/react';
import { type EditorView } from 'prosemirror-view';
import type { TVariableDefinition } from '~/schemas/protocol/variables';
import { contentMap, type TiptapContent } from './contentTypes';
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
  type: TiptapContent,
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

  if (!isValidDropPosition(view, event)) return false;

  if (pos && editor) {
    if (type === 'variable') {
      handleVariableDrop(view, event);
    } else
      editor.chain().focus().insertContentAt(pos.pos, contentMap[type]).run();

    return true;
  }
};

export const isValidDropPosition = (view: EditorView, event: DragEvent) => {
  // Get the drop position
  const coordinates = view.posAtCoords({
    left: event.clientX,
    top: event.clientY,
  });

  if (!coordinates) return false;

  const dropPos = coordinates.pos;
  const resolvedDropPos = view.state.doc.resolve(dropPos);

  // Drop is valid if it's between nodes or the parent is the document
  const isBetweenNodes =
    resolvedDropPos.nodeBefore === null || // node start
    resolvedDropPos.nodeAfter === null; // node end

  if (
    resolvedDropPos.parent.isTextblock || // Prevent dropping inside p, h1, h2, etc.
    resolvedDropPos.parent.type.name === 'bulletList' || // Prevent dropping inside bullet lists
    resolvedDropPos.parent.type.name === 'variable' // Prevent dropping inside other variables
  ) {
    return false;
  }

  return isBetweenNodes || resolvedDropPos.parent.type.name === 'doc';
};
