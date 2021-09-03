import React, {Fragment, useState,useEffect} from 'react';
import getAllTransactions from '../../services/getAllTransactions';
import getTransactionsFilter from '../../services/getTransactionsFilter';
import Table from '../../components/common/Table';
import './styles.scss';


const Dashboard = () => {
    const [dataRender, setDataRender] = useState([]);

    const handleChange = (e) => {
        e.preventDefault();
        return getTransactionsFilter(e.target.value).then(data =>{
            setDataRender(data);
        })
    }
    useEffect(() => {
        return getAllTransactions().then(data => {
            setDataRender(data);
        });
    }, [])
    return (
        <Fragment>
            <div className="container">
                <div className="left">
                    <fieldset>
                        <legend>Filter By</legend>
                        <label>
                            <input type="radio" name="type" value="all" onChange={handleChange} ></input>all
                        </label>
                        <label>
                            <input type="radio" name="type" value="ingress" onChange={handleChange} ></input>ingress
                        </label>
                        <label>
                            <input type="radio" name="type" value="egress" onChange={handleChange} ></input>egress
                        </label>
                        
                    </fieldset>
                </div>
                <div className="right">
                    <form>
                        <fieldset>
                            <legend>Filter By:</legend>
                            <label>
                                Category: <input name="category" placeholder="category"></input>
                            </label>
                            <label>
                                Date: <input name="date" type="date"></input>
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
