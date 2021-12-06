import React, { useState } from 'react';
//MaterialUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAxios } from '../../hooks/useAxios';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface ForgotPasswordFormProps {
  uidb64: string;
  token: string;
}

export const NewPasswordForm: React.FC<ForgotPasswordFormProps> = ({ uidb64, token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setNewPassword(e.target.value.trim());
  };

  const axios = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('/auth/password-reset-complete', {
        password: newPassword,
        token,
        uidb64,
      });
    } catch (e) {
      setError(e);
      console.error(e);
    }
    setPasswordChanged(true);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="New password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Change password
          </Button>
        </form>
      </div>
      {passwordChanged && <Typography variant="h5">Password has been reset</Typography>}
      {error && <Typography variant="h5">Error while resetting password</Typography>}
    </Container>
  );
};
