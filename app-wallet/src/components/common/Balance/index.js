import React, {useEffect, useState} from 'react'
import getTransactionsFilter from '../../../services/getTransactionsFilter'
import './styles.scss';
const Balance = (props) => {
    const [balance, setBalance] = useState(0);
    const [data, setData] = useState([]);

    const calculate = () => {
        let ingress = 0;
        let egress = 0;
        data.forEach(transaction => {
            if(transaction.type === 'ingress'){
                ingress+= transaction.amount
            }else{
                egress+=transaction.amount
            }
        })
        let total = ingress-egress;
        setBalance(total);
    }
    useEffect(() => {
        return getTransactionsFilter('all')
            .then(data => {
                setData(data)
                calculate();
            })
            .catch(e => console.log(e))
    }, [props.data])
    return (
        <div className='balanceContainer'>
                <div className={balance >0 ? 'ingressB' : 'egressB'}>
                    ${balance}           
                </div>
            
        </div>
    )
}

export default Balance
