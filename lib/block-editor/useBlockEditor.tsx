import { useEditor } from '@tiptap/react';
import ExtensionKit from './extensions/extension-kit';
import { handleVariableDrop } from './extensions/Variable/utils';

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
            // check if the drop event is a form variable
            event?.dataTransfer?.types.includes('application/x-form-variable')
          ) {
            handleVariableDrop(view, event);
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
        <variable>
        <label>Variable Label</label>
        <control type="text" control="text" name="variable-name" id="variable-id" hint="Variable hint" />
        </variable>

      `,
    },
    [], // Dependency array
  );

  return { editor };
};
