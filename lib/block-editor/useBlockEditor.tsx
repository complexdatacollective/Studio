import { useEditor } from '@tiptap/react';
import ExtensionKit from './extensions/extension-kit';
import { handleDrop } from './utils';

export const useBlockEditor = () => {
  const editor = useEditor(
    {
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      // onCreate: (ctx) => {},
      extensions: [...ExtensionKit()],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full focus:outline-none',
        },
        handleDrop: function (view, event) {
          if (
            event?.dataTransfer?.types.includes('application/x-content-type')
          ) {
            handleDrop(view, event, editor);
          }

          return false;
        },
      },

      content: `
        <h1>
          Welcome to the Block Editor!
        </h1>
        <p>
          This is a paragraph block.
        </p>
        <h2>
          Another heading
        </h2>
        <p>
          Text following h2.
        </p>
        <ul><li>Unordered list item</li><li>another item</li></ul>
        </ul>
        <variable type="text" control="text">
          <label>Variable Label</label>
          <hint>This is a hint</hint>
        </variable>

      `,
    },
    [], // Dependency array
  );

  return { editor };
};
