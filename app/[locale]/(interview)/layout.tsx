import ThemeProvider from '~/lib/theme/ThemeProvider';

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme="interview">{children}</ThemeProvider>;
}
