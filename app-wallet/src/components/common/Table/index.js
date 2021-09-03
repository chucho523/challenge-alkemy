import React from 'react';
import moment from 'moment';
import './styles.scss';

const Table = ({data}) => {
    return (
        <table >
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {
                   !data[0]? <tr ><td className='noData'>no data available</td></tr>:
                    data.map(transaction => {
                        return(
                            <tr key={transaction.id}>
                                <td>{transaction.amount}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.category}</td>
                                <td>{moment(transaction.date).format('DD/MM/YYYY')}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table
