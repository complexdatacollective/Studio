import { Dropcursor as BaseDropcursor } from '@tiptap/extension-dropcursor';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { isValidVariableDropPosition } from '../Variable/utils';

export const Dropcursor = BaseDropcursor.extend({
  name: 'dropcursor',

  addProseMirrorPlugins() {
    let isVariable = false;

    const basePlugins =
      BaseDropcursor.config.addProseMirrorPlugins?.call(this) ?? [];

    const customPlugin = new Plugin({
      key: new PluginKey('dropcursor'),

      props: {
        handleDOMEvents: {
          dragenter: (view, event) => {
            if (!(event instanceof DragEvent) || !event.dataTransfer) {
              return false;
            }

            isVariable = event.dataTransfer.types.includes(
              'application/x-variable-key',
            );
            if (isVariable && !isValidVariableDropPosition(view, event)) {
              console.log('Variable is being dragged to an invalid position');
              // Prevent dropcursor from being displayed
            } else if (isVariable && isValidVariableDropPosition(view, event)) {
              console.log('Variable is being dragged to a valid position');
            }
            view.updateState(view.state);
            return false;
          },
          dragleave: (view) => {
            isVariable = false;
            view.updateState(view.state);
            return false;
          },
          drop: (view) => {
            isVariable = false;
            view.updateState(view.state);
            return false;
          },
        },
      },
    });

    return [...basePlugins, customPlugin];
  },
});
