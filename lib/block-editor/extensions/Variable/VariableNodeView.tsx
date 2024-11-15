import { Label } from '@radix-ui/react-label';
import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
  useEditorState,
} from '@tiptap/react';
import { AlertCircle } from 'lucide-react';
import { Input } from '~/components/form/Input';
import { cn } from '~/lib/utils';
import { type VariableNodeAttributes } from './Variable';

export const VariableNodeView: React.FC<NodeViewProps> = ({ node, editor }) => {
  const { type, control, options, name, required } =
    node.attrs as VariableNodeAttributes;

  // get selected here instead of from props to get updated value
  const { selected } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        selected: ctx.editor?.isActive('variable', {
          name,
        }),
      };
    },
  });

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
    <NodeViewWrapper
      className={cn(
        'group relative hover:rounded-small hover:border hover:p-2',
        selected && 'rounded-small border bg-surface-1 p-2',
      )}
    >
      <NodeViewContent className="py-2" />

      {required && (
        <div className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-4 w-4" /> Required
        </div>
      )}

      {renderControl()}
    </NodeViewWrapper>
  );
};
