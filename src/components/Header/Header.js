import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    }
}));

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func
};

function Header(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <ElevationScroll {...props}>
                <div className={classes.root}>
                    <AppBar>
                        <Toolbar>
                            <Typography className={classes.title} variant="h5" noWrap>
                                <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
                                    PropKing
                                </NavLink>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
            </ElevationScroll>
            <Toolbar />
        </div>
    );
}

export default Header;