import '~/styles/themes/interview.css';
import { createUseDisableImportedStyles } from './useDisableImportedStyles';

const useDisableImportedStyles = createUseDisableImportedStyles();

export default function InterviewTheme() {
  useDisableImportedStyles();
  return null;
}
