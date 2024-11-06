import { type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { Input } from '~/components/form/Input';
import { Label } from '~/components/form/Label';
import { type ControlNodeAttributes } from './Control';

export const ControlNodeView: React.FC<NodeViewProps> = (props) => {
  const { type, control, options, value, name } = props.node
    .attrs as ControlNodeAttributes;

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
    <NodeViewWrapper>
      <div>{renderControl()}</div>
    </NodeViewWrapper>
  );
};
