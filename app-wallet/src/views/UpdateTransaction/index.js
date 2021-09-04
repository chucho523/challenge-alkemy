import React from 'react'
import {useParams} from 'react-router-dom';
import UpdateTransaction from '../../components/common/PostUpdateTransaction'

const UpdateTransactionView = () => {
    const {id} = useParams();
    return (
        <UpdateTransaction type={'update'} idTransaction={id}/>
    )
}

export default UpdateTransactionView
