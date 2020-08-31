import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Header from "../component/common/header";
import SelectBox from "../component/common/materialUI/select";


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Dashboard = ({tokenCustom}) => {
    
    const classes = useStyles();
    return (
        <>
    <Header></Header>
    <SelectBox></SelectBox>
        <div>
            Token data is: {tokenCustom}
            <br/>
            this is persist work
        </div>
        <div className={classes.root}>
    </div>
        </>
    )
}

const mapStateToProps = state =>({
    tokenCustom:  (state.userReducer && state.userReducer.user && state.userReducer.user.token) || '',
})
export default connect(mapStateToProps) (Dashboard);