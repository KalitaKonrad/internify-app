import React from 'react';
import { BoxProps } from '@material-ui/core/Box/Box';
import { Box } from '@material-ui/core';

export const BoxCenter: React.FC<BoxProps> = ({ children, ...restProps }) => (
  <Box display="flex" justifyContent="center" alignItems="center" {...restProps}>
    {children}
  </Box>
);
