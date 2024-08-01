import { z, type ZodType, type ZodTypeDef } from 'zod';
import { requireServerSession } from './auth';
import type { Session, User } from 'lucia';
import {
  type CacheOptions,
  createCachedFunction,
  type CacheTag,
} from './cache';

type TSchemaInput<T extends z.ZodType | undefined> = T extends z.ZodType
  ? z.infer<T>
  : undefined;

type TInternals<
  TInputSchema extends z.ZodType | undefined,
  TRequireAuthContext extends boolean,
  TEnableCache extends boolean,
> = {
  inputSchema: TInputSchema;
  requireAuthContext?: TRequireAuthContext;
  cacheConfig?: TEnableCache extends true
    ? CacheConfig<TInputSchema, TRequireAuthContext>
    : undefined;
};

export type TContext = {
  user: User;
  session: Session;
};

type CacheConfig<
  TInputSchema extends ZodType<unknown, ZodTypeDef, unknown> | undefined,
  TRequireAuthContext extends boolean = false,
> = {
  tags:
    | ((params: {
        input: TSchemaInput<TInputSchema>;
        context: TRequireAuthContext extends true ? TContext : undefined;
      }) => CacheTag[])
    | CacheTag[];
  revalidate?: CacheOptions['revalidate'];
};

// Void is the only way we can have an argument, but not require it
// to have a value. Undefined/null etc, still require passing the argument.
type HandlerArgs<TInputSchema> = TInputSchema extends z.ZodType
  ? TSchemaInput<TInputSchema>
  : void;

type HandlerFn<
  T,
  TInputSchema extends z.ZodType | undefined,
  TRequireAuthContext extends boolean,
> = (args: {
  input: TSchemaInput<TInputSchema>;
  context: TRequireAuthContext extends true ? TContext : undefined;
}) => T | Promise<T>;

class ActionBuilder<
  TInputSchema extends z.ZodType | undefined,
  TRequireAuthContext extends boolean = false,
  TEnableCache extends boolean = false,
> {
  public $internals: TInternals<
    TInputSchema,
    TRequireAuthContext,
    TEnableCache
  >;

  constructor(
    internals: TInternals<TInputSchema, TRequireAuthContext, TEnableCache>,
  ) {
    this.$internals = internals;
  }

  public input<T extends z.ZodType>(inputSchema: T) {
    if (inputSchema && !(inputSchema instanceof z.ZodType)) {
      throw new Error('Input schema must be a ZodType');
    }

    return new ActionBuilder<z.infer<T>, TRequireAuthContext, TEnableCache>({
      ...this.$internals,
      inputSchema,
    });
  }

  public requireAuthContext() {
    return new ActionBuilder<TInputSchema, true, TEnableCache>({
      ...this.$internals,
      requireAuthContext: true,
      cacheConfig: undefined,
    });
  }

  public cache(config: CacheConfig<TInputSchema, TRequireAuthContext>) {
    return new ActionBuilder<TInputSchema, TRequireAuthContext, true>({
      ...this.$internals,
      cacheConfig: config,
    });
  }

  public handler<T>(fn: HandlerFn<T, TInputSchema, TRequireAuthContext>) {
    // What we return here will be the call signature of the created action
    return async ($args: HandlerArgs<TInputSchema>): Promise<T> => {
      let input: TSchemaInput<TInputSchema> | undefined = undefined;

      const context = this.$internals.requireAuthContext
        ? await requireServerSession() // Will throw if not authenticated!
        : undefined;

      // Will throw if input is invalid!
      if (
        this.$internals.inputSchema &&
        this.$internals.inputSchema instanceof z.ZodType
      ) {
        const validator = this.$internals.inputSchema;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        input = validator.parse($args);
      }

      const handlerFn = async () =>
        fn({
          input: input!,
          context: context as TRequireAuthContext extends true
            ? TContext
            : undefined,
        });

      if (this.$internals.cacheConfig) {
        const { tags, revalidate } = this.$internals.cacheConfig;
        const cacheTags =
          // @ts-expect-error - We know this is a function
          typeof tags === 'function' ? tags({ input, context }) : tags;
        return createCachedFunction(handlerFn, cacheTags, revalidate)();
      }

      return handlerFn();
    };
  }
}

export default function createAction() {
  return new ActionBuilder({
    inputSchema: undefined,
  });
}
