import React from 'react';
import moment from 'moment';
import {useHistory} from 'react-router-dom'
import './styles.scss';

const Table = ({data}) => {
    const history = useHistory();
    return (
        <table>
            <thead>
                <tr>
                    <th>Amount</th>
                    <th  className="hide">Concept</th>
                    <th className="hide2">Type</th>
                    <th>Category</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody> 
                {
                   !data[0]? <tr><td className='noData'>no data available</td></tr>:
                    data.map(transaction => {
                        return(
                            <tr className={`${transaction.type} clickeable`} key={transaction.id} onClick={() => {
                                history.push('/update/'+transaction.id)
                            }}>
                                <td>{'$'+transaction.amount}</td>
                                <td className="hide">{transaction.concept.length>=10 ? transaction.concept.slice(0,10)+'...' : transaction.concept}</td>
                                <td className="hide2">{transaction.type}</td>
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
