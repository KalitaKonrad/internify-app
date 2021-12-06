import React from 'react';
import { Box, Typography } from '@material-ui/core';

interface LineProps {
  header: string;
  description: string | number;
  noPaddingTop?: boolean;
}

export const Line: React.FC<LineProps> = ({ header, description, noPaddingTop }) => {
  return (
    <Box>
      {!noPaddingTop && <Box mt={2} />}
      <Typography variant="h5">{header}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};
