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

              // create the label node
              const labelNode = view.state.schema.nodes.label.create(
                {},
                view.state.schema.text(variable.name ?? 'Label'),
              );

              // create the hint node
              const hintNode = view.state.schema.nodes.hint.create(
                {}, // empty so that it will show the placeholder
              );

              // create the control node
              const controlNode = view.state.schema.nodes.control.create({
                type: variable.type ?? 'text',
                control: variable.control,
                options: variable.options ?? [],
                value: variable.value ?? '',
                name: variable.name ?? '',
                id: variable.id,
                hint: variable.hint ?? '',
              });

              // Create the parent variable node with label and control
              const variableNode = view.state.schema.nodes.variable.create({}, [
                labelNode,
                hintNode,
                controlNode,
              ]);

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
