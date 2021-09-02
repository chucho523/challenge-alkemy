import React, {Fragment} from 'react'
import register from '../../../services/register';
import login from '../../../services/login';
import {Formik} from 'formik'; 
import './styles.scss';

const RegisterLogin = ({type}) => {
    return (
        <Fragment>
            <Formik
                initialValues={{
                    email:'',
                    name:'',
                    password:''            
                }}
                validate= {(values => {
                    const errors = {};

                    if(!values.email){
                        errors.email = 'Required email'
                    }

                    if(type === 'register'){
                        if(!values.name){
                            errors.name = 'Required name'
                        }else if(values.name.length < 3){
                            errors.password = 'The password must contain more than 3 characters'
                        }
                    }

                    if(!values.password){
                        errors.password = 'Required password'
                    }else if(values.password.length < 3){
                        errors.password = 'The password must contain more than 3 characters'
                    }

                    return errors;
                })}
                onSubmit={(values, {setFieldError}) => {
                    if(type === 'register'){
                        //register user
                        return register(values)
                            .catch((e) => {
                                const dataError = e.response.data.error;//get error
                                setFieldError(dataError.path, dataError.message)//set error
                            })
                    }else{
                        //login user
                        return login(values)
                            .then(jwt => console.log(jwt))
                            .catch((e) => {
                                const dataError = e.response.data.error;//get error
                                setFieldError(dataError.path, dataError.message)//set error
                            })
                    }
                   
                }}
            >
                {
                    ({errors, handleSubmit, handleChange, isSubmitting}) => 
                        <form onSubmit={handleSubmit} className="registerForm">
                            <h4>{type} Form</h4>
                            <input className="controls" placeholder="Enter your email" name='email' type="text" onChange={handleChange}></input>
                            {errors.email && <p>{errors.email}</p> /* show error */}
                            {
                                type === 'register' &&
                                <input className="controls" placeholder="Enter your name" name='name' type="text" onChange={handleChange}></input>
                            }
                            {errors.name && <p>{errors.name /* show error */}</p>}
                            <input className="controls" placeholder="Enter your password" name='password' type="password" onChange={handleChange}></input>
                            {errors.password && <p>{errors.password}</p>/* show error */}
                            <button type="submit" disabled={isSubmitting}>{type}</button>
                            
                        </form>                   
                }
            </Formik>
        </Fragment>
    )
}

export default RegisterLogin
