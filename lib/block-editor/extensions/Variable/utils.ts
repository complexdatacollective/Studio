import { type EditorView } from '@tiptap/pm/view';
import type { TVariableDefinition } from '~/schemas/protocol/variables';

export const handleVariableDrag = (
  event: React.DragEvent<HTMLDivElement>,
  key: string,
  variable: TVariableDefinition,
) => {
  event.dataTransfer.setData('application/json', JSON.stringify(variable));
  event.dataTransfer.setData('application/x-variable-key', key);

  // this is used to identify the data as a form variable in handleDrop
  event.dataTransfer.setData('application/x-form-variable', 'true');
};

export const handleVariableDrop = (view: EditorView, event: DragEvent) => {
  // Get the variable data
  const jsonData = event.dataTransfer?.getData('application/json');
  if (!jsonData) return false;
  const newVariable = JSON.parse(jsonData) as TVariableDefinition;
  const key = event.dataTransfer?.getData('application/x-variable-key');

  if (!key) return false;

  // Get the drop position
  const coordinates = view.posAtCoords({
    left: event.clientX,
    top: event.clientY,
  });

  if (!coordinates) return false;

  // check if the drop position is valid
  const dropPos = coordinates.pos;
  const resolvedDropPos = view.state.doc.resolve(dropPos);

  if (
    resolvedDropPos.parent.isTextblock || // Prevent dropping inside p, h1, h2, etc.
    resolvedDropPos.parent.type.name === 'variable' // Prevent dropping inside other variables
  ) {
    return false;
  }

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

  const transaction = view.state.tr.insert(coordinates.pos, variableNode);
  view.dispatch(transaction);

  return true;
};
