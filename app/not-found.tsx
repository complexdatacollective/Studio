import Link from '~/components/Link';
import { routes } from '~/lib/routes';

export default function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <Link href={routes.home()}>Go back to the homepage</Link>
    </div>
  );
}
