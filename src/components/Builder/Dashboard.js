import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function Dashboard() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <center>
            <Link
                to="/builder/projects"
                style={{ textDecoration: "none" }}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "20px" }}>
                    Existing Projects
                      </Button>
            </Link>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                style={{ margin: "20px" }}>
                Create new Project
                     </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <Link
                    to="/builder/build/a"
                    style={{ textDecoration: "none", color: "black" }}>
                    <StyledMenuItem>
                        <ListItemText primary="Apartments" />
                    </StyledMenuItem>
                </Link>
                <Link
                    to="/builder/build/p"
                    style={{ textDecoration: "none", color: "black" }}>
                    <StyledMenuItem>
                        <ListItemText primary="Plots" />
                    </StyledMenuItem>
                </Link>
            </StyledMenu>
        </center>
    )
}

export default Dashboard;
