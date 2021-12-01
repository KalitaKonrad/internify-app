import React, { Children, cloneElement, isValidElement } from 'react';
import { Box, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { LinkWrapper } from '@components/atoms/LinkWrapper';

interface StyledButtonProps {
  onClick: (...args: any) => void;
  type?: 'primary' | 'secondary';
  buttonText: string;
  href?: string;
  buttonClassName?: string;
}

const useStyles = makeStyles((theme) => ({
  secondaryButtonWrapper: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '50%',
  },
  secondaryButtonIconColor: {
    color: theme.palette.secondary.dark,
  },
  primaryButtonWrapper: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: '50%',
  },
  primaryButtonIconColor: {
    color: theme.palette.primary.dark,
  },
}));

export const ButtonIcon: React.FC<StyledButtonProps> = ({
  children,
  buttonClassName,
  href,
  onClick,
  type = 'primary',
  buttonText,
}) => {
  const classes = useStyles();
  const childElements = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        className: type === 'primary' ? classes.primaryButtonIconColor : classes.secondaryButtonIconColor,
      });
    }
  });

  return (
    <LinkWrapper href={href}>
      <Button onClick={onClick} variant="outlined" className={buttonClassName}>
        <Box display="flex" flexGrow={1} justifyContent="center" p={1}>
          <Box
            display="flex"
            justifyContent="center"
            className={type === 'primary' ? classes.primaryButtonWrapper : classes.secondaryButtonWrapper}
            alignItems="center"
            mr={2}
            p={1}
          >
            {childElements}
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" mr={2}>
            <Typography variant="subtitle1" align="center" color="textPrimary">
              {buttonText}
            </Typography>
          </Box>
        </Box>
      </Button>
    </LinkWrapper>
  );
};
