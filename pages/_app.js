import React from "react";
import NoSSR from "react-no-ssr"
import App from "next/app"
import _isEmpty from 'lodash/isEmpty';
import Router from "next/router"

class MyApp extends App {

    render() {
        const { Component, pageProps } = this.props
        return (
            <>
                <NoSSR>
                    <Component {...pageProps} />
                </NoSSR>
            </>
        )
    }
}

export default MyApp
