'use client';

import { useParams } from 'next/navigation';
import { SubmitButton } from '~/components/form/SubmitButton';
import Section from '~/components/layout/Section';
import Heading from '~/components/typography/Heading';
import Paragraph from '~/components/typography/Paragraph';
import { Input } from '~/components/ui/form/Input';
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
  const params = useParams();
  const router = useRouter();

  console.log('form', params);
  return (
    <form
      action={async (payload: FormData) => {
        const { data, error } = await handleSubmit(
          payload,
          params.study,
          inputAttrs.name,
        );

        if (error) {
          alert(error);
          return;
        }

        if (data) {
          router.refresh();
          alert(`Successfully updated ${inputAttrs.name}!`);
        }
      }}
    >
      <Section
        Footer={
          <>
            <Paragraph>{helpText}</Paragraph>
            <SubmitButton />
          </>
        }
      >
        <Heading variant="h3">{title}</Heading>
        <Paragraph>{description}</Paragraph>
        <Input {...inputAttrs} required />
      </Section>
    </form>
  );
}
