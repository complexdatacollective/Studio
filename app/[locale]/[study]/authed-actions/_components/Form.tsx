'use client';

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitButton } from '~/components/form/SubmitButton';
import Section from '~/components/layout/Section';
import Heading from '~/components/typography/Heading';
import Paragraph from '~/components/typography/Paragraph';
import { Input } from '~/components/ui/form/Input';
import {
  ActionPayload,
  type ActionResponse,
} from '~/lib/auth/createAuthedAction';
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
  handleSubmit: (data: FormData, params: Params) => ActionResponse;
}) {
  const [response, setResponse] = useState<ActionPayload>({
    data: null,
    error: null,
  });

  const params = useParams();
  const router = useRouter();

  console.log('form', params);
  return (
    <form
      action={async (payload: FormData) => {
        const result = await handleSubmit(payload, params);

        console.log(result);

        setResponse(result);

        // if (error) {
        //   alert(error);
        //   return;
        // }

        // if (data) {
        //   router.refresh();
        //   alert(`Successfully updated ${inputAttrs.name}!`);
        // }
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
        {response.data && (
          <div className="text-success">Success: {response.data}</div>
        )}
        {response.error && (
          <div className="text-destructive">Denied: {response.error}</div>
        )}
      </Section>
    </form>
  );
}
