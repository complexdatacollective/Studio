import { z } from 'zod';

/**
 * This is a placeholder for whatever we end up using for an AST for storing
 * rich text in JSON format.
 *
 * Summary of the issue: we have to support "rich text"* in various places in
 * the app. We need to be able to store this in a database, and we need to be
 * able to render custom React components in the app based on this data.
 *
 * * rich text is more than just bold and italic text. It has to include things
 * like custom elements for videos, as well as using existing elements such as
 * headings and paragraphs in a sensible way.
 */
const TextNodeSchema = z.object({
  text: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  code: z.boolean().optional(),
  strikethrough: z.boolean().optional(),
  // Add other formatting options as needed
});

export type TextNode = z.infer<typeof TextNodeSchema>;

// Define the schema for an inline element
const InlineElementSchema = z.object({
  type: z.enum(['link']), // Add other inline elements types as needed
  url: z.string().url().optional(),
  children: z.array(TextNodeSchema), // Inline elements should also contain children
});

export type InlineElement = z.infer<typeof InlineElementSchema>;

// Define the schema for a block node
const BlockNodeSchema = z.object({
  type: z.enum(['paragraph', 'heading', 'block-quote', 'video', 'image']), // Add other block types as needed
  props: z.record(z.any()).optional(), // Props for the block node
  children: z.array(z.union([TextNodeSchema, InlineElementSchema])), // Block nodes contain children, which could be text or inline elements
});

export type BlockNode = z.infer<typeof BlockNodeSchema>;

const JSONRichTextSchema = z.array(BlockNodeSchema);

export type JSONRichText = z.infer<typeof JSONRichTextSchema>;

// Utility for protocol keys that must support localisation.
// TODO: figure out how to make the required key (which represents the default)
// locale) definable in the protocol
const LocalisedRecordSchema = z
  .object({
    en: JSONRichTextSchema,
  })
  .and(z.record(JSONRichTextSchema));

export type LocalisedRecord = z.infer<typeof LocalisedRecordSchema>;

export const LocalisedStringSchema = z
  .object({
    en: z.string(),
  })
  .and(z.record(z.string()));

export type LocalisedString = z.infer<typeof LocalisedStringSchema>;
