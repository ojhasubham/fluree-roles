import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { AppRoutes } from "../../../config/AppRoutes";


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem>
                    <Link to={AppRoutes.SELECTBOX}>
                        <ListItemText primary='select' />
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={AppRoutes.PRODUCT}>
                        <ListItemText primary='Product' />
                    </Link>
                </ListItem>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}</ListItemIcon> */}
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}</ListItemIcon> */}
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    // const fullList = side => (
    //     <div
    //         className={classes.fullList}
    //         role="presentation"
    //         onClick={toggleDrawer(side, false)}
    //         onKeyDown={toggleDrawer(side, false)}
    //     >
    //         <List>

    //             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //                 <ListItem button key={text}>
    //                     {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}</ListItemIcon> */}
    //                     <ListItemText primary={text} />
    //                 </ListItem>
    //             ))}
    //         </List>
    //         <Divider />
    //         <List>
    //             {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //                 <ListItem button key={text}>
    //                     {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}</ListItemIcon> */}
    //                     <ListItemText primary={text} />
    //                 </ListItem>
    //             ))}
    //         </List>
    //     </div>
    // );

    return (
        <div>
            <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon  />
                <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                    {sideList('left')}
                </Drawer>
            </IconButton>
        </div>
    );
}
