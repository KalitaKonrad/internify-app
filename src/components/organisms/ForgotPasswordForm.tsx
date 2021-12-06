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

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailSend, setEmailSend] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const axios = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/request-reset-email/', {
        email,
        redirect_url: 'http://localhost:3000/auth/reset-password/',
      });
    } catch (e) {
      setError(e);
      console.error(e);
    }
    setEmailSend(true);
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            Send Reset Link
          </Button>
        </form>
      </div>
      {emailSend && <Typography variant="h5">Reset password link has been sent to your email</Typography>}
      {error && <Typography variant="h5">Error while sending reset email link</Typography>}
    </Container>
  );
};
