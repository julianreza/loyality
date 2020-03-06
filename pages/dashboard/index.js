import Head from 'next/head'
import { DashboardContainer } from '../../src'

const Login = () => {
    return (
        <div>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <DashboardContainer />
            </main>
        </div>
    )
}

export default Login