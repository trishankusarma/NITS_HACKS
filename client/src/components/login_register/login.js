import React,{ useState , useEffect } from 'react'

import { Link , useHistory } from 'react-router-dom';

import AxiosInstance from '../../utilsClient/AxiosInstance';

import Cookies from 'js-cookie';

const Login = () => {

    const history = useHistory();

    const [ user , setUser ] = useState({
        email:'',
        password:''
    })

    const [response , setResponse] = useState('');

    const {  email , password } = user;

    const handleChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    useEffect(async()=>{

        if(Cookies.get('authorization')){          
             history.push('/');
        }
    },[])

    const onSubmit = async (e)=>{
        e.preventDefault();

        const config = {
            header: {
              'Content-Type': 'application/json'
            }
        }
        const res = await AxiosInstance.post( '/user/login' , user , config );

        console.log(res);
        
        res.data.error!==null ? setResponse(res.data.error) : history.push('/');
    }

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={onSubmit}>
                <input
                   name='email'
                   type='email'
                   value={email}
                   placeholder='Enter Email'
                   onChange={handleChange}
                   required 
                />
                <input
                   name='password'
                   type='password'
                   value={password}
                   placeholder='Enter Password'
                   onChange={handleChange}
                   required 
                />
                <button type='submit'>
                    Login
                </button>
            </form>
            { response }
            <div>
                Not an User ? 
                <Link to='/user/register'>
                     Register
                </Link>
            </div>
        </div>
    )
}

export default Login
