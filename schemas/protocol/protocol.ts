import { z } from 'zod';
import { StageSchema } from './interfaces/stages';
import { CodebookSchema } from './codebook/codebook';
import { WaveSchema } from './wave';
import { SupportedLocalesSchema } from '~/lib/localisation/config';

export const AssetManifest = z.object({});

export const ProtocolMessagesSchema = z.object({
  Protocol: z.object({
    Stages: z.record(
      z.string(),
      z.object({
        Label: z.string(),
        Panels: z
          .record(
            z.string(),
            z.object({
              Title: z.string(),
            }),
          )
          .optional(),
      }),
    ),
    Prompts: z.record(z.string(), z.string()),
  }),
});

const LocalisedStringsSchema = z.record(
  SupportedLocalesSchema,
  ProtocolMessagesSchema,
);

export type ProtocolMessages = z.infer<typeof ProtocolMessagesSchema>;

const ProtocolSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    // Hack to work around this: https://github.com/colinhacks/zod/issues/2376
    languages: z.array(SupportedLocalesSchema),
    localisedStrings: LocalisedStringsSchema,
    stages: z.array(StageSchema.or(z.array(StageSchema))),
    codebook: CodebookSchema,
    waves: z.array(WaveSchema).optional(),
  })
  // May not need this - will throw error if extra fields are present
  // when parsing.
  .strict();

export type Protocol = z.infer<typeof ProtocolSchema>;
