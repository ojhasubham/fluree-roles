import React from 'react';
import requestService from '../../../services/requestService';
import { toast } from 'react-toastify';
import {
    registerFlureeUser
  } from "../../../utils/flureeFunctions";

const RegisterButton = ({values, isValid, touched}) => {
    
    const handleClick = async () => {
        if(touched.email && touched.password && values.isAgree && values.role){
            const data = await registerFlureeUser({...values, "create-user?": true, expire: 999999999, roles: [["_role/id", values.role]]})
            console.log('@@@data', data);
            debugger
            toast.success('Register Success');
        } else {
            toast.error('Please Enter Currect Data');
            
        }
    }
    
    return(
        <div>
            <button type="button" onClick={handleClick} className="btn btn-def btn-block btn-info">Register</button>
        </div>
    )
}

export default RegisterButton;
