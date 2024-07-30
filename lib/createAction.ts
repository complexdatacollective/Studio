import { z, ZodType, ZodTypeDef } from 'zod';
import { requireServerSession } from './auth';
import type { Session, User } from 'lucia';
import { CacheOptions, createCachedFunction, type CacheTag } from './cache';

type TSchemaInput<T extends z.ZodType | undefined> = T extends z.ZodType
  ? z.infer<T>
  : undefined;

type TInternals<TInputSchema extends z.ZodType | undefined> = {
  inputSchema: TInputSchema;
  requireAuthContext?: boolean;
  cacheConfig?: CacheConfig<TInputSchema>;
};

export type TContext = {
  user: User;
  session: Session;
};

type CacheConfig<
  TInputSchema extends ZodType<unknown, ZodTypeDef, unknown> | undefined,
> = {
  tags: (params: {
    input: TSchemaInput<TInputSchema>;
    context: TContext;
  }) => CacheTag[];
  revalidate?: CacheOptions['revalidate'];
};

// Void is the only way we can have an argument, but not require it
// to have a value. Undefined/null etc, still require passing the argument.
type HandlerArgs<TInputSchema> = TInputSchema extends z.ZodType
  ? TSchemaInput<TInputSchema>
  : void;

class ActionBuilder<
  TInputSchema extends z.ZodType | undefined,
  TRequireAuthContext extends boolean = false,
> {
  public $internals: TInternals<TInputSchema>;

  constructor(internals: TInternals<TInputSchema>) {
    this.$internals = internals;
  }

  public input<T extends z.ZodType>(inputSchema: T) {
    if (inputSchema && !(inputSchema instanceof z.ZodType)) {
      throw new Error('Input schema must be a ZodType');
    }

    return new ActionBuilder<T, TRequireAuthContext>({
      ...this.$internals,
      inputSchema,
    });
  }

  public requireAuthContext() {
    return new ActionBuilder<TInputSchema, true>({
      ...this.$internals,
      requireAuthContext: true,
    });
  }

  public cache(config: CacheConfig<TInputSchema>) {
    return new ActionBuilder<TInputSchema, TRequireAuthContext>({
      ...this.$internals,
      cacheConfig: config,
    });
  }

  public handler<T>(
    fn: (args: {
      input: TSchemaInput<TInputSchema>;
      context: TRequireAuthContext extends true ? TContext : undefined;
    }) => T | Promise<T>,
  ) {
    // What we return here will be the call signature of the created action
    return async ($args: HandlerArgs<TInputSchema>): Promise<T> => {
      let input: TSchemaInput<TInputSchema>;
      let context: TContext | undefined;

      context = this.$internals.requireAuthContext
        ? await requireServerSession() // Will throw if not authenticated!
        : undefined;

      // Will throw if input is invalid!
      input = this.$internals.inputSchema
        ? this.$internals.inputSchema.parse($args?.input)
        : undefined;

      return fn({
        input,
        context: context as TRequireAuthContext extends true
          ? TContext
          : undefined,
      });
    };
  }
}

export default function createAction() {
  return new ActionBuilder({
    inputSchema: undefined,
  });
}
