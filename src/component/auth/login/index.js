import React from 'react';
import { Formik } from 'formik';
import './login.css';
import * as yup from 'yup';
import ToasterService from '../../common/toasterService';
import LoginButton from './button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        marginLeft: '42%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    typography: {
        marginLeft: '38%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const LoginForm = () => {
    const classes = useStyles();
    const LoginSchema = yup.object().shape({
        email: yup.string()
            .email('Invalid email')
            .required('Required'),
        password: yup.string()
            .min(6, 'Too Short')
            .max(18, 'Too Long')
            .required('Required'),
        isAgree: yup.boolean()
            .oneOf([true], 'Must Accept Terms and Conditions')
            .required('Required')
    });
    return (
        <>
            <Formik
                initialValues={{ email: '', password: '', isAgree: false }}
                onSubmit={async values => {
                    ToasterService();
                    await new Promise(resolve => setTimeout(resolve, 500));
                }}
                validationSchema={LoginSchema}
            >
                {({ handleBlur, values, handleChange, handleSubmit, errors }) => (
                    <Container component="main" maxWidth="xs" style={{marginTop: '10rem'}}>
                        <CssBaseline />
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography style={{textAlign: 'center'}} component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox"
                                        name="isAgree"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.isAgree} /> I agree to the <a href="!#">Terms and Conditions</a>
                                </label>
                            </div>
                            <div className="form-group">
                                <LoginButton values={values}></LoginButton>
                            </div>
                            <div className="form-group text-center">
                                <a href="!#">Forgot Password</a>&nbsp;|&nbsp;<a href="/signup">Sign UP</a>
                            </div>
                        </form>

                    </Container>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;
