import { useEditor } from '@tiptap/react';
import ExtensionKit from './extensions/extension-kit';

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
            try {
              // Get the variable data
              const jsonData = event.dataTransfer.getData('application/json');
              const variable = JSON.parse(jsonData);

              // Get the drop position
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });

              if (!coordinates) return false;

              // Create and insert the new variable node
              const variableNode = view.state.schema.nodes.variable.create({
                type: variable.type,
                name: variable.name,
                id: variable.id,
                control: variable.control,
                options: variable.options,
                hint: variable.hint,
              });

              const transaction = view.state.tr.insert(
                coordinates.pos,
                variableNode,
              );
              view.dispatch(transaction);

              return true;
            } catch (error) {
              console.error('Error handling form variable drop:', error);
              return false;
            }
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

      `,
    },
    [], // Dependency array
  );

  return { editor };
};
