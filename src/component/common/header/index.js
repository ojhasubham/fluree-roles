import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import userAction from "../../../action/UserAction";
import Sidebar from "../sidebar";
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Popover from '@material-ui/core/Popover';
import Box from "@material-ui/core/Box";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  }
}));

const Header = ({ setUserData }) => {
  const logout = () => {
    setUserData({ token: '' })
  }
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Sidebar></Sidebar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Badge p= {4} badgeContent={4} color="primary">
            <MailIcon />
          </Badge>
          <Box m={2}>

          <Avatar alt="Remy Sharp" src="../../../../public/logo192.png" onClick={handleClick} />
          </Box>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography className={classes.typography}>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </Typography>
          </Popover>
        </Toolbar>
      </AppBar>
    </>
  )
}
const mapStateToProps = state => ({
  tokenCustom: (state.userReducer && state.userReducer.user && state.userReducer.user.token) || ''
})

const mapDispatchToProps = dispatch => ({
  setUserData: (data) => dispatch(userAction.setUserData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);