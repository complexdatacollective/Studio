import InjectThemeVariables from '~/lib/theme/InjectThemeVariables';

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InjectThemeVariables theme="interview" />
      {children}
    </>
  );
}
