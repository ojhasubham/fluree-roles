
import { connect } from 'react-redux';

let isAuth = false;
const isLogin = ({tokenCustom}) => {
    if(tokenCustom){
        isAuth = true
        return isAuth
    } else {
        return isAuth
    }
};

const mapStateToProps = state =>({
    tokenCustom:  (state.userReducer && state.userReducer.user && state.userReducer.user.token) || '',
})

export default connect(mapStateToProps) (isLogin);