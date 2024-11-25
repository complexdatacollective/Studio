import { type EditorView } from '@tiptap/pm/view';
import type { TVariableDefinition } from '~/schemas/protocol/variables';

export const handleVariableDrop = (view: EditorView, event: DragEvent) => {
  // Get the variable data
  const jsonData = event.dataTransfer?.getData('application/json');
  if (!jsonData) return false;
  const newVariable = JSON.parse(jsonData) as TVariableDefinition;
  const key = event.dataTransfer?.getData('application/x-variable-key');

  if (!key) return false;

  const { hint, variable, label } = view.state.schema.nodes;

  // create the label node
  const labelNode = label?.create(
    {},
    view.state.schema.text(newVariable.label.en ?? key), // todo: integrate with internationalization
  );

  // create the hint node
  const hintNode = hint?.create(
    {}, // empty so that it will show the placeholder
  );

  const optionsLabels =
    newVariable.type === 'categorical'
      ? (newVariable.options?.map(
          (option: { label: string }) => option.label,
        ) ?? [])
      : [];

  // Create the parent variable node with label and control
  if (!variable || !labelNode || !hintNode) return false;

  const variableNode = variable.create(
    {
      type: newVariable.type,
      options: optionsLabels,
      name: key,
      control: newVariable.control,
    },
    [labelNode, hintNode],
  );

  const coordinates = view.posAtCoords({
    left: event.clientX,
    top: event.clientY,
  });

  if (!coordinates) return false;

  const transaction = view.state.tr.insert(coordinates.pos, variableNode);
  view.dispatch(transaction);

  return true;
};
