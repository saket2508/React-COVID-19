import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop:40,
        marginBottom:40,
    },
    heading:{
        marginBottom:1,
        flex:1,
        flexDirection:"row"
    },
    title:{
        fontSize: 14,
    },
    card:{
        display: 'block',
        width: '100%',
        transitionDuration: '0.3s',
        height: '100%'
    },
    cardTitle:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        jalignItems:'center'
    },
    avatar:{
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
        marginLeft: theme.spacing(0.65),
        marginRight: theme.spacing(0.65),
        marginTop:theme.spacing(0.5)
    },
  }));

const CardLoading = () => {
    const classes= useStyles()
    return(
        <div style={{marginTop:30, marginBottom: 60}} className="container-lg">
        <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
                <Card variant="outlined" className={classes.card}>
                    <CardHeader
                        title={ 
                            <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} width="50%" />
                        }/>
                    <CardContent>
                    <React.Fragment>
                            <Skeleton animation="wave" height={100} variant="rect" width="100%" style={{ marginBottom: 20 }} />  

                            <Skeleton animation="wave" height={10} variant="rect" style={{ marginBottom: 5 }} />
                            <Skeleton animation="wave" height={10} variant="rect" style={{ marginBottom: 5 }} />
                            <Skeleton animation="wave" height={10} variant="rect" style={{ marginBottom: 15 }} />


                        </React.Fragment>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Card variant="outlined" className={classes.card}>
            <CardHeader
                       title={ 
                        <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} width="50%" />
                    }/>
                    <CardContent>
                    <React.Fragment>
                            <Skeleton animation="wave" height={100} variant="rect" width="100%" style={{ marginBottom: 20 }} />  

                            <Skeleton animation="wave" height={10} variant="rect" style={{ marginBottom: 5 }} />
                            <Skeleton animation="wave" height={10} variant="rect" style={{ marginBottom: 5 }} />
                            <Skeleton animation="wave" height={10} variant="rect" style={{ marginBottom: 15 }} />
                        </React.Fragment>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Card variant="outlined" className={classes.card}>
            <CardHeader
                        title={ 
                            <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} width="50%" />
                        }/>
                    <CardContent>
                        <React.Fragment>
                            <Skeleton animation="wave" height={200} variant="rect" style={{ marginBottom: 5 }} /> 
                        </React.Fragment>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Card variant="outlined" className={classes.card}>
            <CardHeader
                        title={ 
                            <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} width="50%" />
                        }/>
                    <CardContent>
                    <React.Fragment>
                            <Skeleton animation="wave" height={200} variant="rect" style={{ marginBottom: 5 }} />  
                        </React.Fragment>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </div>
    )
}

export default CardLoading