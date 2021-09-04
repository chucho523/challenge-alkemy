import React from 'react'
import { useHistory, Link} from 'react-router-dom';
import './styles.scss';

const NavBar = ({token}) => {
    const history = useHistory();
    return (
        <nav>
            <Link to="/dashboard"  className="wallet">Wallet</Link>
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
                    <li>
                        <button className="add"
                            onClick={() => history.push('/login')}
                        >
                            SignIn
                        </button>
                        <button className="add add2"
                            onClick={() => history.push('/register')}
                        >
                            SignUp
                        </button>
                     </li>
                </ul>
            }
        </nav>
    )
}

export default NavBar
