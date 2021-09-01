import React, {Fragment} from 'react'
import register from '../../../services/register';
import {Formik} from 'formik'; 

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
                        const dataError = e.response.data.error;
                        setFieldError(dataError.path, dataError.message)
                    })
                }}
            >
                {
                    ({errors, handleSubmit, handleChange, isSubmitting}) => 
                        <form onSubmit={handleSubmit}>
                            <label>
                                Email: 
                                <input name='email' type="text" onChange={handleChange}></input>
                            </label>
                            <label>
                                Name: 
                                <input name='name' type="text" onChange={handleChange}></input>
                            </label>
                            <label>
                                Password: 
                                <input name='password' type="password" onChange={handleChange}></input>
                            </label>
                            <button type="submit" disabled={isSubmitting}>Sign In</button>
                            <span>
                                {errors.email || errors.password || errors.name || ''}
                            </span>
                        </form>
                    
                }
            </Formik>
        </Fragment>
    )
}

export default Register
