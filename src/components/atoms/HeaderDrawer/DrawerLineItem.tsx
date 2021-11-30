import React from 'react';
import { Box } from '@material-ui/core';

interface DrawerLineItemProps {
  noHorizontalMargin?: boolean;
}
export const DrawerLineItem: React.FC<DrawerLineItemProps> = ({ children, noHorizontalMargin }) => {
  return (
    <Box my={1} mx={noHorizontalMargin ? 0 : 3}>
      {children}
    </Box>
  );
};
