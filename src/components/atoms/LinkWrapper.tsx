import React from 'react';
import NextLink from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    cursor: 'pointer',
  },
}));

export const LinkWrapper: React.FC<{ href?: string }> = ({ href, children }) => {
  const classes = useStyles();

  return href ? (
    <span className={classes.link}>
      <NextLink href={href}>{children}</NextLink>
    </span>
  ) : (
    <>{children}</>
  );
};
