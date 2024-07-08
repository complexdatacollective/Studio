export const metadata = {
  title: 'Interview',
  description: 'Network Canvas Interview',
};

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-navy-taupe text-white">{children}</body>
    </html>
  );
}
