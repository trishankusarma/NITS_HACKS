import React,{ useState , useEffect } from 'react'

import { Link , useHistory } from 'react-router-dom';

import AxiosInstance from '../../utilsClient/AxiosInstance';

import Cookies from 'js-cookie';

import '../../css/login_register/login.css';

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
        const res = await AxiosInstance.post( '/vendor/login' , user , config );

        console.log(res);
        
        res.data.error!==null ? setResponse(res.data.error) : history.push('/');
    }

    return (
        <div className="Login">
        
        <form onSubmit={onSubmit}>
        <div className="logo"><img src="../logo.png" width="150vh" height="120vh"></img></div>
            <input
               name='email'
               type='email'
               value={email}
               autoComplete='off'
               placeholder='Enter Email'
               onChange={handleChange}
               required 
            />
            <input
               name='password'
               type='password'
               autoComplete='off'
               value={password}
               placeholder='Enter Password'
               onChange={handleChange}
               required 
            />
            <button className="button" type='submit'>
                Login
            </button>
        </form>
        { response }
        <div className="forgotPass">
            Forgot Password ? 
            
        </div>
        <div className="newUser">
            Not an User ? 
            <Link to='/user/register'>
                <span>Register</span>
            </Link>
        </div>
        
    </div>
    )
}

export default Login
