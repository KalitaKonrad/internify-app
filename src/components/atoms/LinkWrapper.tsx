import React from 'react';
import NextLink from 'next/link';

export const LinkWrapper: React.FC<{ href?: string }> = ({ href, children }) =>
  href ? <NextLink href={href}>{children}</NextLink> : <>{children}</>;
