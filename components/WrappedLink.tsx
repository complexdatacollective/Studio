import { FC } from 'react';
import { Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';

type Props = {
  href: string;
  linkProps?: LinkProps;
};

const WrappedLink: React.FC<Props> = ({
  href,
  linkProps,
  children,
}) => (
  <NextLink href={href} passHref>
    <Link {...linkProps}>
      {children}
    </Link>
  </NextLink>
);

export default WrappedLink;
