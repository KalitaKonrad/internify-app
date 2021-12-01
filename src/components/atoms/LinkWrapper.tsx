import React from 'react';
import NextLink from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  link: {
    cursor: 'pointer',
  },
}));

export const LinkWrapper: React.FC<{ href?: string; className?: string }> = ({ href, className, children }) => {
  const classes = useStyles();

  return href ? (
    <span className={clsx(classes.link, className)}>
      <NextLink href={href}>{children}</NextLink>
    </span>
  ) : (
    <>{children}</>
  );
};
