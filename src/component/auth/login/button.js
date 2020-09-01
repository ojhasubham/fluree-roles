import React from 'react';
import { connect } from 'react-redux';
import userAction from '../../../action/UserAction';
import reqService from '../../../services/requestService'
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import {
    loginFlureeUser
  } from "../../../utils/flureeFunctions";


const LoginButton = ({ values, setUserData }) => {
    let history = useHistory();

    const handleClick = async () => {
        const resp = await loginFlureeUser({ user: values.email, password: values.password, expire: 999999999})
        if (resp) {
            localStorage.setItem('token', resp);
            history.push('/dashboard');
        }
    }

    return (
        <div>
            <Button type="button" onClick={() => handleClick()} fullWidth
                variant="contained"
                color="primary">Login</Button>
        </div>
    )
}
const mapDispatchToProps = dispatch => ({
    setUserData: (data) => dispatch(userAction.setUserData(data))
})
export default connect(null, mapDispatchToProps)(LoginButton);
