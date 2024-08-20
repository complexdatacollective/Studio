// Docs: https://github.com/complexdatacollective/Network-Canvas/wiki/protocol.json#variable-registry
export enum EntityTypes {
  edge = 'edge',
  node = 'node',
}

export type EntityTypeDefinition = {
  name?: string;
  color?: Color;
  iconVariant?: string;
  variables: Record<string, VariableDefinition>;
};

export type NodeTypeDefinition = EntityTypeDefinition & {
  name: string;
  color: Color | string;
  iconVariant?: string;
};

export type EdgeTypeDefinition = NodeTypeDefinition;

export type Codebook = {
  node?: Record<string, NodeTypeDefinition>;
  edge?: Record<string, EdgeTypeDefinition>;
  ego?: EntityTypeDefinition;
};

export const NodeColors = [
  'seq-node-1',
  'seq-node-2',
  'seq-node-3',
  'seq-node-4',
  'seq-node-5',
  'seq-node-6',
  'seq-node-7',
  'seq-node-8',
] as const;

export const NodeTypeDefinitionSchema = z.object({
  name: z.string(),
  color: z.string().refine((value) => NodeColors.includes(value as any), {
    message: 'Invalid color',
  }),
  iconVariant: z.string().optional(),
  variables: z.record(VariableDefinitionSchema),
});

export const CodebookSchema = z.object({
  node: z.record(NodeTypeDefinitionSchema),
  edge: z.record(EdgeTypeDefinitionSchema),
  ego: EntityTypeDefinitionSchema,
});
