import Head from 'next/head'
import { Container, Paper, Grid, TextField, Button, Backdrop } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import { useFormik } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required()
        .test("same", " Wrong Email", data => {
            if (data !== 'rhezajulian@gmail.com') {
                return false
            }
            return true
        }),
    password: Yup.string()
        .min(2)
        .max(50)
        .required()
        .test("same", " Wrong Password", data => {
            if (data !== '123456') {
                return false
            }
            return true
        }),
})

const LoginContainer = () => {

    const responseFacebook = (response) => {
        localStorage.setItem("user", JSON.stringify(response));
        window.location.href = "/dashboard"
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: values => {
            localStorage.setItem("user", JSON.stringify({
                name: 'Reza Julian',
                email: values.email
            }));
            window.location.href = "/dashboard"
        }
    })

    return (
        <div>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Container maxWidth="sm">
                    <Paper elevation={5} style={{ padding: 30 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={!formik.isValid}
                                    required
                                    label="Email"
                                    name="email"
                                    type='email'
                                    id="email"
                                    value={formik.values.email}
                                    helperText={formik.errors.email}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!formik.isValid}
                                    required
                                    label="Password"
                                    name="password"
                                    type='password'
                                    id="password"
                                    value={formik.values.password}
                                    helperText={formik.errors.password}
                                    onChange={formik.handleChange}
                                    autoComplete="current-password"
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    onClick={formik.handleSubmit}
                                    variant="contained">
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <FacebookLogin
                                    appId="2834267406662327"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    render={renderProps => (
                                        <Button
                                            onClick={renderProps.onClick}
                                            variant="contained"
                                            color="primary"
                                            startIcon={<FacebookIcon />}>
                                            Facebook
                                        </Button>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </main>
        </div>
    )
}

export default LoginContainer