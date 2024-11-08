import { Label } from '@radix-ui/react-label';
import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';
import { AlertCircle, Pencil } from 'lucide-react';
import { Button } from '~/components/Button';
import { Input } from '~/components/form/Input';
import Popover from '~/components/Popover';
import { type VariableNodeAttributes } from './Variable';
import VariableToolbar from './VariableToolbar';

export const VariableNodeView: React.FC<NodeViewProps> = ({
  node,
  editor,
  deleteNode,
  updateAttributes,
  selected,
}) => {
  const { type, control, options, name, required } =
    node.attrs as VariableNodeAttributes;

  const renderControl = () => {
    switch (type) {
      case 'text':
        return control === 'textArea' ? (
          <textarea className="h-48 w-full" />
        ) : (
          <Input type="text" name={name} />
        );

      case 'number':
        return <Input type="number" name={name} />;

      case 'categorical':
        return control === 'checkboxGroup' ? (
          <div>
            {options.map((option: string) => (
              <div key={option} className="flex items-center gap-2">
                <input type="checkbox" id={option} />
                <Label>{option}</Label>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-2">
            {options.map((option: string) => (
              <button
                key={option}
                className="h-24 w-24 rounded-full border border-accent"
              >
                {option}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <NodeViewWrapper className="group relative hover:rounded-small hover:border hover:bg-surface-1 hover:p-2">
      <NodeViewContent className="py-2" />
      <Popover
        content={
          <VariableToolbar
            deleteNode={deleteNode}
            editor={editor}
            attributes={node.attrs as VariableNodeAttributes}
            updateAttributes={updateAttributes}
          />
        }
      >
        <Button
          size="icon"
          variant="outline"
          className="absolute right-1 top-1 opacity-0 group-hover:opacity-100"
          color="primary"
        >
          <Pencil />
        </Button>
      </Popover>
      {required && (
        <div className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-4 w-4" /> Required
        </div>
      )}

      {renderControl()}
    </NodeViewWrapper>
  );
};
