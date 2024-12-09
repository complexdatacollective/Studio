// adapted from tiptap dropcursor extension
// https://github.com/ueberdosis/tiptap/tree/main/packages/extension-dropcursor
// uses custom prosemirror-dropcursor replacement instead of prosemirror-dropcursor plugin

import { Extension } from '@tiptap/core';
import { dropCursor } from './pmDropcursorReplacement';

export type DropcursorOptions = {
  /**
   * The color of the drop cursor
   * @default 'currentColor'
   * @example 'red'
   */
  color: string | undefined;

  /**
   * The width of the drop cursor
   * @default 1
   * @example 2
   */
  width: number | undefined;

  /**
   * The class of the drop cursor
   * @default undefined
   * @example 'drop-cursor'
   */
  class: string | undefined;
};

/**
 * This extension allows you to add a drop cursor to your editor.
 * A drop cursor is a line that appears when you drag and drop content
 * inbetween nodes.
 * @see https://tiptap.dev/api/extensions/dropcursor
 */
export const Dropcursor = Extension.create<DropcursorOptions>({
  name: 'dropcursor',

  addOptions() {
    return {
      color: 'currentColor',
      width: 1,
      class: undefined,
    };
  },

  addProseMirrorPlugins() {
    return [dropCursor(this.options)];
  },
});
