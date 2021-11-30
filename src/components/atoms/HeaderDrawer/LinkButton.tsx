import React from 'react';
import { LinkWrapper } from '@components/atoms/LinkWrapper';
import { Button, ButtonProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface LinkButtonProps extends ButtonProps {
  href?: string;
}

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 25,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

export const LinkButton: React.FC<LinkButtonProps> = ({ href, ...restProps }) => {
  const classes = useStyles();

  return (
    <LinkWrapper href={href}>
      <Button {...restProps} className={classes.button} />
    </LinkWrapper>
  );
};
