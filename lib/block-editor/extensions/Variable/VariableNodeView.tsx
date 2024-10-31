import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';

export const VariableNodeView: React.FC<NodeViewProps> = ({ node }) => {
  const { type, name, hint, label, id, control } = node.attrs;

  return (
    <NodeViewWrapper>
      <div className="flex justify-between bg-surface-2 p-2">
        <div className="flex flex-col">
          <span>Id: {id}</span>
          <span>Name: {name}</span>
          <span>Label: {label}</span>
          <span>Hint: {hint}</span>
          <span>Type: {type}</span>
          <span>Control: {control}</span>
        </div>
      </div>
    </NodeViewWrapper>
  );
};
