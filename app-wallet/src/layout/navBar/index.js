import React from 'react'
import { useHistory } from 'react-router';
import './styles.scss';

const NavBar = ({token}) => {
    const history = useHistory();
    return (
        <nav>
            <div className="wallet">Wallet</div>
            {
                token ? 
                <div className='containerNav'>
                    <div className='welcome hide2'>Welcome {window.localStorage.getItem('user')}</div>
                    <ul>
                        
                        <li><button className="logOut" onClick={() => {
                            window.localStorage.removeItem('token');
                            window.localStorage.removeItem('user');
                            window.location.href = '/login'
                        }}>LogOut</button></li>
                        <li><button className="add" onClick={() => history.push('/post')}>Add transaction</button></li>
                    </ul>
                </div>
                :
                <ul>
                    <li>Cosas</li>
                </ul>
            }
        </nav>
    )
}

export default NavBar
