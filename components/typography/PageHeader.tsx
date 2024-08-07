import Heading from './Heading';
import Paragraph from './Paragraph';

const PageHeader = ({
  headerText,
  subHeaderText,
}: {
  headerText: string;
  subHeaderText: string;
}) => (
  <div className="mb-6">
    <Heading variant="h1" className="mb-2">
      {headerText}
    </Heading>
    <Paragraph variant="lead">{subHeaderText}</Paragraph>
  </div>
);

export default PageHeader;
