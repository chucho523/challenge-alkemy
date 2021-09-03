import React from 'react';
import './styles.scss';

const Dashboard = () => {
    return (
        <div className="container">
            <div className="left">
                <fieldset>
                    <legend>Filter By</legend>
                    <label>
                        <input type="radio" name="type" value="ingress"></input>ingress
                    </label>
                    <label>
                        <input type="radio" name="type" value="egress"></input>egress
                    </label>
                    <label>
                        <input type="radio" name="type" value="all"></input>all
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
    )
}

export default Dashboard
