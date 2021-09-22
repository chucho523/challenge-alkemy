import React, {Fragment, useState,useEffect} from 'react';
import getAllTransactions from '../../services/getAllTransactions';
import getTransactionsFilter from '../../services/getTransactionsFilter';
import Table from '../../components/common/Table';

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
            <div className="text-center text-3xl underline text-white my-2"><h4>Balance:</h4></div>
            <Balance data={transactions}/>
            <div className="text-center text-3xl underline text-white my-2"><h4>Filter By</h4></div>
            <div className="container flex flex-wrap w-100 justify-center mb-4 text-white">
                <div className="left mx-2 mb-2 p-2  w-full sm:w-2/5 bg-indigo-900 rounded">
                    <fieldset className="flex flex-row justify-center align-center">
                        <label className="ml-3">
                            <input className="mr-1" type="radio" name="type" value="all" checked={selectedFilter === 'all'} onChange={handleChange} ></input>all
                        </label>
                        <label className="ml-3">
                            <input className="mr-1" type="radio" name="type" value="ingress" checked={selectedFilter === 'ingress'} onChange={handleChange} ></input>ingress
                        </label>
                        <label className="ml-3">
                            <input className="mr-1" type="radio" name="type" value="egress" checked={selectedFilter === 'egress'} onChange={handleChange} ></input>egress
                        </label>
                        
                    </fieldset>
                </div>
                <div className="right w-full sm:w-2/5 mx-2 mb-2 pb-2 bg-indigo-900 rounded">
                    <form>
                        <fieldset className="flex flex-row justify-center align-center">
                            <label className="mt-2 px-2">
                                Category: <input name="category" className="rounded bg-gray-500 pl-2" value={category} placeholder="category" onChange={handleChangeCategory}></input>
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
