import { z } from 'zod';
import { requireServerSession } from './auth';
import type { Session, User } from 'lucia';
import { createCachedFunction } from './cache';

type TSchemaInput<T extends z.ZodType | undefined> = T extends z.ZodType
  ? T['_input']
  : undefined;

type TInternals<TInputSchema extends z.ZodType | undefined> = {
  inputSchema: TInputSchema;
  requireAuthContext?: boolean;
};

type TContext = {
  user: User;
  session: Session;
};

type THandlerFunc<TSchemaInput, TReturn, TContext> = (params: {
  input: TSchemaInput;
  context: TContext;
}) => Promise<TReturn>;

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

  public handler<T>(
    fn: THandlerFunc<
      TSchemaInput<TInputSchema>,
      T,
      TRequireAuthContext extends true ? TContext : undefined
    >,
  ) {
    return async ($args: TSchemaInput<TInputSchema>) => {
      const context = this.$internals.requireAuthContext
        ? await requireServerSession()
        : undefined;

      const input = this.$internals.inputSchema!.parse(
        $args.input as TSchemaInput<TInputSchema>,
      ) as TSchemaInput<TInputSchema>;

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

// Example usage
export const myAction = createAction()
  .input(z.object({ functionParameter: z.string() }))
  .requireAuthContext()
  // .cache({
  //   tags: (input) => ['myAction', `myAction-${input.functionParameter}`],
  // })
  .handler(
    createCachedFunction(
      async ({ input, context }) => {
        const { functionParameter } = input;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = {
          greeting: `Hello, ${functionParameter}!`,
          userId: context.user.id,
        };

        return data;
      },
      ['studies:get'],
    ),
  );
