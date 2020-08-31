import React from 'react';
import { Formik } from 'formik';
import './register.css';
import * as yup from 'yup';
import RegisterButton from './button';
import {
    TextField,
    Button,
    Container,
    Paper,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Typography,
  } from "@material-ui/core";

const  SighUpForm = () => {
    const RegisterSchema = yup.object().shape({
        email: yup.string()
            .email('Invalid email')
            .required('Required'),
        password: yup.string()
            .min(6, 'Too Short')
            .max(18, 'Too Long')
            .required('Required'),
        role: yup.string()
            .required('Required'),
        isAgree: yup.boolean()
            .oneOf([true], 'Must Accept Terms and Conditions')
            .required('Required')
    });
        return (
            <>
                <Formik
                    initialValues={{ email: '', password: '', role: '', isAgree: false }}
                    onSubmit={async values => {
                        // ToasterService();
                        // await new Promise(resolve => setTimeout(resolve, 500));
                    }}
                    validationSchema={RegisterSchema}
                >
                    {({ handleBlur, values, handleChange, handleSubmit, errors, touched, isValid }) => (
                        <div className="container">
                            <div className="row">
                                <div className="Absolute-Center is-Responsive">
                                    <div className="Register-header">Register Component</div>
                                    <div className="col-sm-12  col-md-offset-1">
                                        <form id="RegisterForm" onSubmit={handleSubmit}>
                                            <div className="form-group input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                                <input
                                                    type="text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                    name="email"
                                                    className="form-control"
                                                />
                                                {errors.email && <div id="feedback">{errors.email}</div>}
                                            </div>
                                            <div className="form-group input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /></span>
                                                <input
                                                    type="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                    name="password"
                                                    className="form-control"
                                                />
                                                {errors.password && <div id="feedback">{errors.password}</div>}
                                            </div>
                                            <select name="role" value={values.role} onBlur={handleBlur} onChange={handleChange}>
                                                <option value="">--Please Select a Color--</option>
                                                <option value="seller">seller</option>
                                                <option value="customer">customer</option>
                                            </select>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox"
                                                        name="isAgree"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.isAgree} /> I agree to the <a href="!#">Terms and Conditions</a>
                                                </label>
                                            </div>
    
                                            <div className="form-group">
                                                <RegisterButton touched ={touched } isValid={isValid} values={values}></RegisterButton>
                                                {/* <button type=submit" className="btn btn-def btn-block btn-info">Register</button> */}
                                            </div>
                                            <div className="form-group text-center">
                                            <a href="!#">Forgot Password</a>&nbsp;|&nbsp;<a href="/login">Login</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
            </>
        );
}

export default SighUpForm;
