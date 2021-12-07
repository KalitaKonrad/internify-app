import React from 'react';
import { Box, Link, Typography } from '@material-ui/core';

interface LineProps {
  header: string;
  description: string | number;
  noPaddingTop?: boolean;
  isLink?: boolean;
}

export const Line: React.FC<LineProps> = ({ header, isLink, description, noPaddingTop }) => {
  return (
    <Box>
      {!noPaddingTop && <Box mt={2} />}
      <Typography variant="h5">{header}</Typography>

      {isLink ? (
        <Link variant="body1" href={description as string}>
          {description}
        </Link>
      ) : (
        <Typography variant="body1">{description}</Typography>
      )}
    </Box>
  );
};
