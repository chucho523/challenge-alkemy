import React, {Fragment, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
//import services
import postTransaction from '../../../services/postTransaction';
import updateTransaction from '../../../services/updateTransaction';
import getTransaction from '../../../services/getTransaction';
import deleteTransaction from '../../../services/deleteTransaction';

import GenericButton from '../GenericButton';
import {Formik} from 'formik'; 
import swal from 'sweetalert'; //import alerts
import './styles.scss';

const PostUpdateTransaction = ({type, idTransaction}) => {
    const history = useHistory();
    const [transaction, setTransaction] = useState({
        amount: '',
        concept: '',
        type: 'ingress',
        category: '',
        date: ''
    });

    //functions
    const del = () => {
        //confirm delete
        swal({
            title:'Delete',
            text: 'are you sure you want to delete the transaction?',
            icon: 'warning',
            buttons: ['No', 'Yes']
        }).then(res =>{
            if(res){
                //notification delete
                return deleteTransaction(idTransaction)
                    .then(resp => {
                        swal({
                            title:'successful',
                            text:'transaction deleted successfully',
                            icon:'success',
                            button: 'ok',
                            timer: 2000
                        }).then(() => {
                            history.push('/dashboard')
                        })
                    })
            }
        })
    }
    useEffect(()=>{
        if(type === "update"){
            getTransaction(idTransaction).then(data => {
                console.log(data)
                setTransaction(data)})
        }
    },[idTransaction, type])
    return (
            <Fragment>
                <Formik
                    enableReinitialize
                    initialValues={{
                        amount: transaction.amount,
                        concept: transaction.concept,
                        type: transaction.type,
                        category: transaction.category,
                        date: transaction.date           
                    }}
                    
                    //validate errors
                    validate= {(values => {
                        const errors = {};
                        //errors amount
                        if(!values.amount){
                            errors.amount = 'Required amount'
                        }else if(!(values.amount>0)){
                            errors.amount = "Enter a valid amount"
                        }
                        //errors concept
                        if(!values.concept){
                            errors.concept = 'Required concept'
                        }else if(values.concept.length < 3){
                            errors.concept = 'The concept must contain more than 3 characters'
                        }
                        if(!values.category){
                            errors.category = 'Required category'
                        }else if(values.category.length <3){
                            errors.category = 'The concept must contain more than 3 characters'
                        }
                        if(!values.date){
                            errors.date = "Required date"
                        }
                        return errors;
                    })}
                    onSubmit={(values, {setFieldError}) => {
                        if(type === 'post'){
                            //add transaction
                            return postTransaction(values)
                                .then(data => {console.log(data)
                                    console.log(values);
                                })
                                .catch((e) => {
                                    console.log(values);
                                    const dataError = e.response.data.error;//get error
                                    setFieldError(dataError.path, dataError.message)//set error
                                })
                        }else{
                            //update transaction
                            return updateTransaction(values, idTransaction)
                                .then(data => {
                                   console.log(data);
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
                                <input className="controls" placeholder="Amount" name='amount' type="text" onChange={handleChange}></input>
                                {errors.amount && <p>{errors.amount}</p> /* show error */}

                                <textarea className="controls" maxLength="60" cols="30" rows="3" placeholder="Concept" name='concept' type="text" onChange={handleChange}></textarea>
                                {errors.concept && <p>{errors.concept}</p>/* show error */}
                                {   type==='post'
                                    ?
                                     <select name="type" onChange={handleChange} defaultValue="ingress" className='controls'>
                                        <option value="ingress">Ingress</option>
                                        <option value="egress">Egress</option>                                   
                                     </select>
                                    :
                                    <select name="type" onChange={handleChange} className='controls' disabled>
                                        <option value="ingress">Ingress</option>
                                        <option value="egress">Egress</option>                                   
                                    </select> 
                                }

                                {errors.type && <p>{errors.type}</p> /* show error */}

                                <input className="controls" placeholder="Category" name='category' type="text" onChange={handleChange}></input>
                                {errors.category && <p>{errors.category}</p> /* show error */}

                                <input name='date' className="controls" type="date" onChange={handleChange}></input>
                                {errors.date && <p>{errors.date}</p> /* show error */}
                                <GenericButton type="submit" disabled={isSubmitting} text={type} />
                                {type === 'update' &&
                                    <button className="btnDelete" onClick={del}>Delete</button>
                                }
                                
                            </form>                   
                    }
                </Formik>
            </Fragment>
        )
}

export default PostUpdateTransaction
