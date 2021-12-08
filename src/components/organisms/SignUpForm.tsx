import React, { useState } from 'react';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { useAxios } from '../../hooks/useAxios';
import { useDialog } from '../../hooks/useDialog';
import { SignInForm } from '@components/organisms/SignInForm';
import { UserType } from '../../hooks/useSession';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface SignUpProps {
  usertype: string;
}

export const SignUpForm: React.FC<SignUpProps> = ({ usertype }) => {
  const router = useRouter();
  const initialFormData = Object.freeze({
    email: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: [],
    username: [],
    password: [],
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const axios = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, password } = formData;
    try {
      await axios.post('auth/register/', {
        email,
        username,
        password,
        user_type: usertype,
      });
      setDialogOpen(false);
    } catch (e) {
      setErrors(e.response.data.errors);
    }
  };

  const { setDialogChildren, setDialogTitle, setDialogOpen } = useDialog();
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Sign up as {usertype === UserType.IS_COMPANY ? 'company' : 'employee'}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                helperText={errors['email']?.[0]}
                error={!!errors['email']?.[0]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
                helperText={errors['username']?.[0]}
                error={!!errors['username']?.[0]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                helperText={errors['password']?.[0]}
                error={!!errors['password']?.[0]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="#"
                onClick={() => {
                  setDialogOpen(true);
                  setDialogTitle('Sign in');
                  // TODO: this logic is wrong, should pass dynamic UserType
                  setDialogChildren(<SignInForm usertype={UserType.IS_EMPLOYEE} />);
                }}
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
