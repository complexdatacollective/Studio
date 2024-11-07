import { Label } from '@radix-ui/react-label';
import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';
import { Input } from '~/components/form/Input';
import Tooltip from '~/components/Tooltip';
import { type VariableNodeAttributes } from './Variable';
import VariableHoverMenu from './VariableHoverMenu';

export const VariableNodeView: React.FC<NodeViewProps> = ({
  node,
  editor,
  deleteNode,
  updateAttributes,
}) => {
  const { type, control, options, name } = node.attrs as VariableNodeAttributes;

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
    <Tooltip
      tooltip={
        <VariableHoverMenu
          deleteNode={deleteNode}
          editor={editor}
          attributes={node.attrs as VariableNodeAttributes}
          updateAttributes={updateAttributes}
        />
      }
    >
      <NodeViewWrapper className="relative">
        <NodeViewContent className="py-2" />
        {renderControl()}
      </NodeViewWrapper>
    </Tooltip>
  );
};
