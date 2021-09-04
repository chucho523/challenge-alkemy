import React, {Fragment, useState,useEffect} from 'react';
import getAllTransactions from '../../services/getAllTransactions';
import getTransactionsFilter from '../../services/getTransactionsFilter';
import Table from '../../components/common/Table';
import './styles.scss';
import Balance from '../../components/common/Balance';


const Dashboard = () => {
    //states
    const [transactions, setTransactions] = useState([]);
    const [dataRender, setDataRender] = useState([]);
    const [category, setCategory] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    //functions
    const filterElements = (element) =>{

        let search = transactions.filter(item => {
            if(item.category.toLowerCase().includes(element)){
                return item;
            }
        });
        setDataRender(search);
        
        
    }
    const handleChange = (e) => {
        e.preventDefault();
        setSelectedFilter(e.target.value);
        return getTransactionsFilter(e.target.value).then(data =>{
            setDataRender(data);
            setTransactions(data)
            setCategory('');
        })

    }
    const handleChangeCategory = (e) =>{
        e.preventDefault();
        setCategory(e.target.value);
        filterElements(e.target.value);
    }

    useEffect(() => {
        return getAllTransactions().then(data => {
            setTransactions(data);
            setDataRender(data);
        });
    }, [])
    return (
        <Fragment>
            <div className="title"><h4>Balance:</h4></div>
            <Balance data={transactions}/>
            <div className="filterTitle"><h4>Filter By</h4></div>
            <div className="container">
                <div className="left">
                    <fieldset>
                        <label>
                            <input type="radio" name="type" value="all" checked={selectedFilter === 'all'} onChange={handleChange} ></input>all
                        </label>
                        <label>
                            <input type="radio" name="type" value="ingress" checked={selectedFilter === 'ingress'} onChange={handleChange} ></input>ingress
                        </label>
                        <label>
                            <input type="radio" name="type" value="egress" checked={selectedFilter === 'egress'} onChange={handleChange} ></input>egress
                        </label>
                        
                    </fieldset>
                </div>
                <div className="right">
                    <form>
                        <fieldset>
                            <label>
                                Category: <input name="category" value={category} placeholder="category" onChange={handleChangeCategory}></input>
                            </label>
                        </fieldset>
                    </form>
                </div> 
            </div>
            <div className="centerTable">
                <div className="tableContainer">
                    <Table data={dataRender}></Table>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard
