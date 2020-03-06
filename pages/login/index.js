import Head from 'next/head'
import { Container } from '@material-ui/core';
import { LoginContainer } from '../../src'

const Login = () => {
    return (
        <div>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <LoginContainer />
            </main>
        </div>
    )
}

export default Login