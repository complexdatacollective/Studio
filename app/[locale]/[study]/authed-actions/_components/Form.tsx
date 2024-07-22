'use client';

import { useParams } from 'next/navigation';
import { SubmitButton } from '~/components/form/SubmitButton';
import { type ActionResponse } from '~/lib/auth/createAuthedAction';
import { useRouter } from '~/lib/localisation/navigation';

export default function Form({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
}: {
  title: string;
  description: string;
  helpText: string;
  inputAttrs: {
    name: string;
    type: string;
    defaultValue: string;
    placeholder?: string;
    maxLength?: number;
    pattern?: string;
  };
  handleSubmit: (
    data: FormData,
    id: string,
    key: string,
  ) => Promise<ActionResponse>;
}) {
  const { id } = useParams();
  const router = useRouter();

  console.log('form', id);
  return (
    <form
      action={async (payload: FormData) => {
        const { data, error } = await handleSubmit(
          payload,
          id,
          inputAttrs.name,
        );

        if (error) {
          alert(error);
          return;
        }

        if (data) {
          // va.track(`Updated ${inputAttrs.name}`, id ? { id } : {});
          if (id) {
            router.refresh();
          } else {
            router.refresh();
          }
          alert(`Successfully updated ${inputAttrs.name}!`);
        }
      }}
      className="border-stone-200 dark:border-stone-700 dark:bg-black rounded-lg border bg-white"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="font-cal text-xl dark:text-white">{title}</h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm">
          {description}
        </p>
        <input
          {...inputAttrs}
          required
          className="border-stone-300 text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:placeholder-stone-700 w-full max-w-md rounded-md border text-sm focus:outline-none dark:text-white"
        />
      </div>
      <div className="border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-800 flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-stone-500 dark:text-stone-400 text-sm">{helpText}</p>
        <SubmitButton />
      </div>
    </form>
  );
}
