import { type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { Input } from '~/components/form/Input';
import { Label } from '~/components/form/Label';

export const VariableNodeView: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
}) => {
  const { type, control, options = [], value } = node.attrs;

  const renderControl = () => {
    switch (type) {
      case 'text':
        return control === 'textArea' ? (
          <textarea className="h-48 w-full" />
        ) : (
          <Input type="text" name={node.attrs.name} />
        );

      case 'number':
        return <Input type="number" name={node.attrs.name} />;

      case 'categorical':
        return control === 'checkboxGroup' ? (
          <div>
            {options.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={option}
                  checked={value?.includes(option)}
                />
                <Label>{option}</Label>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-2">
            {options.map((option) => (
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
    <NodeViewWrapper>
      <div className="flex flex-col space-y-4">
        <Label
          contentEditable="true"
          onBlur={(e) =>
            updateAttributes({ label: e.currentTarget.textContent })
          }
        >
          {node.attrs.label || node.attrs.name}
        </Label>

        <p
          className="text-xs"
          contentEditable="true"
          // suppressContentEditableWarning
          onBlur={(e) =>
            updateAttributes({ hint: e.currentTarget.textContent })
          }
        >
          {node.attrs.hint}
        </p>

        <div>{renderControl()}</div>
      </div>
    </NodeViewWrapper>
  );
};
