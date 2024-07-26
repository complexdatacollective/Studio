import { z } from 'zod';
import { requireServerSession } from './auth';
import type { Session, User } from 'lucia';

type TSchemaInput<T extends z.ZodType | undefined> = T extends z.ZodType
  ? T['_input']
  : undefined;

type TInternals<TInputSchema extends z.ZodType | undefined> = {
  inputSchema: TInputSchema;
  injectAuthContext?: boolean;
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
  TInjectAuthContext extends boolean = false,
> {
  public $internals: TInternals<TInputSchema>;

  constructor(internals: TInternals<TInputSchema>) {
    this.$internals = internals;
  }

  public input<T extends z.ZodType>(inputSchema: T) {
    if (inputSchema && !(inputSchema instanceof z.ZodType)) {
      throw new Error('Input schema must be a ZodType');
    }

    return new ActionBuilder<T, TInjectAuthContext>({
      ...this.$internals,
      inputSchema,
    });
  }

  public injectAuthContext() {
    return new ActionBuilder<TInputSchema, true>({
      ...this.$internals,
      injectAuthContext: true,
    });
  }

  public handler<T>(
    fn: THandlerFunc<
      TSchemaInput<TInputSchema>,
      T,
      TInjectAuthContext extends true ? TContext : undefined
    >,
  ) {
    return async ($args: TSchemaInput<TInputSchema>) => {
      const context = this.$internals.injectAuthContext
        ? await requireServerSession()
        : undefined;

      const input = this.$internals.inputSchema!.parse(
        $args,
      ) as TSchemaInput<TInputSchema>;

      return fn({
        input,
        context: context as TInjectAuthContext extends true
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
  .injectAuthContext()
  .handler(async ({ input, context }) => {
    const { functionParameter } = input;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = {
      greeting: `Hello, ${functionParameter}!`,
      userId: context?.user.id,
    };

    return data;
  });
