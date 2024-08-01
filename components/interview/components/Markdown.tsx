import ReactMarkdown from 'react-markdown';

export default function Markdown({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div>
      <ReactMarkdown className={className}>{label}</ReactMarkdown>
    </div>
  );
}
