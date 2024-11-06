import { type EditorView } from '@tiptap/pm/view';

// simplified version of the variable type
export type Variable = {
  id: string;
  type: string;
  name: string;
  control: string;
  options?: string[];
  hint?: string;
};

export const handleVariableDrag = (
  event: React.DragEvent<HTMLDivElement>,
  variable: Variable,
) => {
  event.dataTransfer.setData('application/json', JSON.stringify(variable));
  // this is used to identify the data as a form variable in handleDrop
  event.dataTransfer.setData('application/x-form-variable', 'true');
};

export const handleVariableDrop = (view: EditorView, event: DragEvent) => {
  // Get the variable data
  const jsonData = event.dataTransfer?.getData('application/json');
  if (!jsonData) return false;
  const newVariable = JSON.parse(jsonData) as Variable;

  // Get the drop position
  const coordinates = view.posAtCoords({
    left: event.clientX,
    top: event.clientY,
  });

  if (!coordinates) return false;

  const { hint, variable, label } = view.state.schema.nodes;

  // create the label node
  const labelNode = label?.create(
    {},
    view.state.schema.text(newVariable?.name), // default to variable name
  );

  // create the hint node
  const hintNode = hint?.create(
    {}, // empty so that it will show the placeholder
  );

  // create the control node
  const controlNode = view?.state?.schema?.nodes?.control?.create({
    type: newVariable.type ?? 'text',
    control: newVariable.control,
    options: newVariable.options ?? [],
    name: newVariable.name ?? '',
    id: newVariable.id,
    hint: newVariable.hint ?? '',
  });

  // Create the parent variable node with label and control
  if (!variable || !labelNode || !hintNode || !controlNode) return false;

  const variableNode = variable.create({}, [labelNode, hintNode, controlNode]);

  const transaction = view.state.tr.insert(coordinates.pos, variableNode);
  view.dispatch(transaction);

  return true;
};
