import React, {useEffect, useState} from 'react'
import getTransactionsFilter from '../../../services/getTransactionsFilter'
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
        <div className='w-full flex justify-center text-2xl'> 
                <div className={balance >0 ? 'bg-green-400 p-2 rounded' : 'bg-red-600 p-2 rounded' }>
                    ${balance}           
                </div>
            
        </div>
    )
}

export default Balance
