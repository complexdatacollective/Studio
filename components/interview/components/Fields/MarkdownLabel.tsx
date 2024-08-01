import Markdown from './Markdown';

export default function MarkdownLabel({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return <Markdown className={className} label={label} />;
}
