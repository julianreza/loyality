import Head from 'next/head'
import { Container, Paper, Grid, TextField, Button, IconButton, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, CardActionArea, Avatar } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Skeleton } from '@material-ui/lab';
import _isEmpty from 'lodash/isEmpty';
const DashboardContainer = () => {

    const [get, setGet] = useState(0)
    const [dataMovie, setDataMovie] = useState([])
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [dataUser, setDataUser] = useState({})

    const handleChangePage = (event, value) => {
        setPage(value)
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login"
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=20398cf7c8c8bf7999451cea79917980&language=en-US&page=${page}`)
            setTimeout(() => {
                setDataMovie(response.data.results)
            }, 2000);
        }
        fetchData();
    }, [page]);

    useEffect(() => {
        if (dataMovie.length > 0) {
            setLoading(false)
        }
    }, [dataMovie])

    useEffect(() => {
        setDataUser(JSON.parse(localStorage.getItem("user")))
    }, [get])

    return (
        <div>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Container>
                    <Paper elevation={5} style={{ padding: 30 }}>
                        <Card style={{ marginBottom: 20 }}>
                            {!_isEmpty(dataUser) &&
                                <CardHeader
                                    avatar={
                                        <Avatar alt="Profile" src={dataUser.picture !== undefined && dataUser.picture.data.url} />
                                    }
                                    action={
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    }
                                    title={dataUser.name}
                                    subheader={dataUser.email}
                                />
                            }
                        </Card>
                        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
                            <Pagination count={10} color="primary" onChange={handleChangePage} />
                        </div>
                        <Grid container justify="center" spacing={2}>
                            {
                                loading ?
                                    [0, 2, 3, 4].map(value => (
                                        <Grid key={value} item xs={3}>
                                            <Card style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 800 }}>
                                                <Skeleton variant="rect" width={300} height={450} animation="wave" />
                                                <CardContent>
                                                    <Skeleton variant="text" />
                                                    <Skeleton variant="text" />
                                                    <Skeleton variant="text" />
                                                    <Skeleton variant="text" />
                                                    <Skeleton variant="text" />
                                                    <Skeleton variant="text" />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )) :
                                    dataMovie.map((value, index) => (
                                        <Grid key={index} item xs={3}>
                                            <Card style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 800 }}>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                                    <img src={`http://image.tmdb.org/t/p/w300${value.poster_path}`} style={{ borderRadius: 30 }} />
                                                </div>
                                                <CardContent>
                                                    <Typography gutterBottom>
                                                        {value.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {value.overview}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                            }
                        </Grid>
                    </Paper>
                </Container>
            </main>
        </div >
    )
}

export default DashboardContainer