export default function ThemeProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: string;
}) {
  const url = `/themes/${theme}.css`;

  return (
    <>
      <link rel="stylesheet" href={url} />
      {children}
    </>
  );
}
