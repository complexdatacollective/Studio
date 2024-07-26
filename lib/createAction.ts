import { z } from 'zod';

type TSchemaInput<T extends z.ZodType | undefined> = T extends z.ZodType
  ? T['_input']
  : undefined;

type TInternals<TInputSchema extends z.ZodType | undefined> = {
  inputSchema: TInputSchema;
};

type THandlerFunc<TSchemaInput, TReturn> = (
  input: TSchemaInput,
) => Promise<TReturn>;

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
      inputSchema,
    });
  }

  public handler<T>(fn: THandlerFunc<TSchemaInput<TInputSchema>, T>) {
    return async ($args: TSchemaInput<TInputSchema>) => {
      const input = this.$internals.inputSchema!.parse(
        $args,
      ) as TSchemaInput<TInputSchema>;

      return fn(input);
    };
  }
}

export default function createAction() {
  return new ActionBuilder({
    inputSchema: undefined,
  });
}

export const myAction = createAction()
  .input(z.object({ functionParameter: z.string() }))
  .handler(async (input) => {
    const { functionParameter } = input;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = {
      greeting: `Hello, ${functionParameter}!`,
    };

    return data;
  });
