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

type THandlerFunc<TSchemaInput, TReturn> = (params: {
  input: TSchemaInput;
  context?: TContext;
}) => Promise<TReturn>;

class ActionBuilder<TInputSchema extends z.ZodType | undefined> {
  public $internals: TInternals<TInputSchema>;

  constructor(internals: TInternals<TInputSchema>) {
    this.$internals = internals;
  }

  public input<T extends z.ZodType>(inputSchema: T) {
    if (inputSchema && !(inputSchema instanceof z.ZodType)) {
      throw new Error('Input schema must be a ZodType');
    }

    return new ActionBuilder<T>({
      ...this.$internals,
      inputSchema,
    });
  }

  public injectAuthContext() {
    return new ActionBuilder<TInputSchema>({
      ...this.$internals,
      injectAuthContext: true,
    });
  }

  public handler<T>(fn: THandlerFunc<TSchemaInput<TInputSchema>, T>) {
    return async ($args: TSchemaInput<TInputSchema>) => {
      let context;
      if (this.$internals.injectAuthContext) {
        context = await requireServerSession();
      }

      const input = this.$internals.inputSchema!.parse(
        $args,
      ) as TSchemaInput<TInputSchema>;

      return fn({ input, context });
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
      userId: context.user.id,
    };

    return data;
  });
