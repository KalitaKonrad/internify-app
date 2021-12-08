import React, { useState } from 'react';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { UserType, useSession } from '../../hooks/useSession';
import { useDialog } from '../../hooks/useDialog';
import NextLink from 'next/link';
import { Link } from '@material-ui/core';
import { SignUpForm } from '@components/organisms/SignUpForm';

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

interface SignInFormProps {
  setDrawerOpen?: (val: boolean) => void;
  usertype: UserType;
}

export const SignInForm: React.FC<SignInFormProps> = ({ usertype }) => {
  const router = useRouter();
  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });

  const { login } = useSession();

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(formData.email, formData.password);
    setDialogOpen(false);
  };

  const classes = useStyles();
  const { setDialogChildren, setDialogTitle, setDialogOpen } = useDialog();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Sign in
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                // component={NextLink}
                // href="/auth/forgot-password/"
                variant="body2"
                style={{ cursor: 'pointer' }}
                // component="div"
                onClick={() => {
                  setDialogOpen(false);
                  router.push('/auth/forgot-password/');
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  setDialogOpen(true);
                  setDialogTitle('Sign up');
                  setDialogChildren(<SignUpForm usertype={usertype} />);
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
