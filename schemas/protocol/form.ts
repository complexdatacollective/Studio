import { z } from 'zod';
import {
  type JSONRichText,
  JSONRichTextSchema,
  LocalisedStringSchema,
} from '~/schemas/shared';
import { Operators } from './logic';
import { EncodableKeyString } from './protocol';

const FieldRule = z.object({
  field: EncodableKeyString,
  operator: Operators,
  value: z.union([z.boolean(), z.number(), z.string()]),
});

const BaseCondition = z.object({
  action: z.enum(['SHOW', 'HIDE']),
});

const ConditionWithRule = BaseCondition.extend({
  rule: FieldRule,
}).or(
  BaseCondition.extend({
    join: z.enum(['AND', 'OR']),
    rules: z.array(FieldRule),
  }),
);

type ConditionWithRule = z.infer<typeof ConditionWithRule>;

const FieldSchema = z.object({
  variable: z.string(),
  label: LocalisedStringSchema,
  hint: LocalisedStringSchema.optional(),
});

type Field = z.infer<typeof FieldSchema>;

type ElementGroup =
  | {
      condition: ConditionWithRule;
      elements: Element[];
    }
  | Element[];

const FieldGroupSchema: z.ZodType<ElementGroup> = z.union([
  z.object({
    condition: ConditionWithRule,
    elements: z.array(
      z.union([
        FieldSchema,
        JSONRichTextSchema,
        z.lazy(() => FieldGroupSchema),
      ]),
    ),
  }),
  z.array(z.union([FieldSchema, z.lazy(() => FieldGroupSchema)])),
]);

export const FormSchema = z.array(z.union([FieldSchema, FieldGroupSchema]));

type Element = Field | JSONRichText | ElementGroup;

export type Form = z.infer<typeof FormSchema>;

export const FormsSchema = z.record(EncodableKeyString, FormSchema);

export type Forms = z.infer<typeof FormsSchema>;

/**
 * Examples
 */
