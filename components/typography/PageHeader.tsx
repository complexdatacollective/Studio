import Heading from './Heading';
import Paragraph from './Paragraph';

const PageHeader = ({
  headerText,
  subHeaderText,
}: {
  headerText: string;
  subHeaderText: string;
}) => (
  <div className="my-10 mb-14">
    <Heading variant="h1" className="mb-2">
      {headerText}
    </Heading>
    <Paragraph variant="lead" margin="none">
      {subHeaderText}
    </Paragraph>
  </div>
);

export default PageHeader;
