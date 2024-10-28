import { z } from 'zod';
import { LocalisedStringSchema } from '~/schemas/shared';
import { Operators } from './logic';

const FieldRule = z.object({
  field: z.string(),
  operator: Operators,
  value: z.union([z.boolean(), z.number(), z.string()]),
});

const BaseCondition = z.object({
  action: z.enum(['SHOW', 'HIDE']),
});

const ConditionWithSingleRule = BaseCondition.extend({
  rule: FieldRule,
});

type ConditionWithSingleRule = z.infer<typeof ConditionWithSingleRule>;

const ConditionWithMultipleRules = BaseCondition.extend({
  join: z.enum(['AND', 'OR']),
  rules: z.array(FieldRule),
});

type ConditionWithMultipleRules = z.infer<typeof ConditionWithMultipleRules>;

const SingleFieldSchema = z.object({
  variable: z.string(),
  label: LocalisedStringSchema,
});

type SingleField = z.infer<typeof SingleFieldSchema>;

type FieldGroup = {
  condition?: ConditionWithSingleRule | ConditionWithMultipleRules;
  fields: Item[];
};

const FieldGroupSchema: z.ZodType<FieldGroup> = z.object({
  condition: z
    .union([ConditionWithSingleRule, ConditionWithMultipleRules])
    .optional(),
  fields: z.array(z.union([SingleFieldSchema, z.lazy(() => FieldGroupSchema)])),
});

export const FormSchema = z.object({
  title: LocalisedStringSchema,
  fields: z.array(z.union([SingleFieldSchema, FieldGroupSchema])),
});

type Item = SingleField | FieldGroup;

export type Form = z.infer<typeof FormSchema>;
