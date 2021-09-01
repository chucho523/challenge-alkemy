import React, {Fragment} from 'react'
import register from '../../../services/register';
import {Formik} from 'formik'; 
import './styles.scss';

const Register = () => {
    return (
        <Fragment>
            <h2>Register</h2>
            <Formik
                initialValues={{
                    email:'',
                    name:'',
                    password:''            
                }}
                onSubmit={(values, {setFieldError}) => {
                   return register(values)
                    .catch((e) => {
                        const dataError = e.response.data.error;//get error
                        setFieldError(dataError.path, dataError.message)//set error
                    })
                }}
            >
                {
                    ({errors, handleSubmit, handleChange, isSubmitting}) => 
                        <form onSubmit={handleSubmit} className="registerForm">
                            <h4>Registration Form</h4>
                            <input className="controls" placeholder="Enter your email" name='email' type="text" onChange={handleChange}></input>
                            <input className="controls" placeholder="Enter your name" name='name' type="text" onChange={handleChange}></input>
                            <input className="controls" placeholder="Enter your password" name='password' type="password" onChange={handleChange}></input>
                            <button type="submit" disabled={isSubmitting}>Sign In</button>
                            <p>
                                {errors.email || errors.password || errors.name || '' /*SHOW ERRORS */} 
                            </p>
                        </form>                   
                }
            </Formik>
        </Fragment>
    )
}

export default Register
