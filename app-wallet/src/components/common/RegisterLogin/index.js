import React, {Fragment} from 'react'
import register from '../../../services/register';
import login from '../../../services/login';
import GenericButton from '../GenericButton';
import {Formik} from 'formik'; 
import usePasswordToggle from '../../hooks/usePasswordToggle';
import './styles.scss';

const RegisterLogin = ({type}) => {
    const [passwordInputType, ToggleIcon] = usePasswordToggle();
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
                    //errors email
                    if(!values.email){
                        errors.email = 'Required email'
                    }
                    //errors name
                    if(type === 'Register'){
                        if(!values.name){
                            errors.name = 'Required name'
                        }else if(values.name.length < 3){
                            errors.password = 'The password must contain more than 3 characters'
                        }
                    }
                    //errors password
                    if(!values.password){
                        errors.password = 'Required password'
                    }else if(values.password.length < 3){
                        errors.password = 'The password must contain more than 3 characters'
                    }

                    return errors;
                })}
                onSubmit={(values, {setFieldError}) => {
                    if(type === 'Register'){
                        //register user
                        return register(values)
                            .catch((e) => {
                                const dataError = e.response.data.error;//get error
                                setFieldError(dataError.path, dataError.message)//set error
                            })
                    }else{
                        //login user
                        return login(values)
                            .then(jwt => {
                                window.localStorage.setItem('token', jwt.token);
                                window.localStorage.setItem('user', jwt.name);
                            })
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
                                type === 'Register' &&
                                <input className="controls" placeholder="Enter your name" name='name' type="text" onChange={handleChange}></input>
                            }
                            {errors.name && <p>{errors.name /* show error */}</p>}
                            
                            <div className="password">
                                <input className="controls" placeholder="Enter your password" name='password' type={passwordInputType} onChange={handleChange}></input>
                                <span className='password-toggle-icon'>{ToggleIcon}</span>
                            </div>
                            {errors.password && <p>{errors.password}</p>/* show error */}
                            <GenericButton type="submit" disabled={isSubmitting} text={type} />
                            
                        </form>                   
                }
            </Formik>
        </Fragment>
    )
}

export default RegisterLogin
