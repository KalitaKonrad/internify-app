import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core';
import { BoxCenter } from '@components/atoms/BoxCenter';
import { Line } from '@components/atoms/Line';
import { useSession } from '../../hooks/useSession';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    padding: 40,
    borderRadius: 10,
    width: '100%',
  },
}));

export const EmployeeProfile: React.FC<EmployeeProfileProps> = () => {
  const classes = useStyles();
  const { userEmployee } = useSession();

  return (
    <BoxCenter flexDirection="column" p={3}>
      <Paper className={classes.paper}>
        <Box>
          <Line header="Email" description={userEmployee.user.email} />
          <Line header="Username" description={userEmployee.user.username} />
        </Box>
      </Paper>
      <Box mt={4} />
    </BoxCenter>
  );
};
