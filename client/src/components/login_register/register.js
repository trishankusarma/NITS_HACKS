import React,{ useState , useEffect } from 'react'

import { Link , useHistory } from 'react-router-dom';

import AxiosInstance from '../../utilsClient/AxiosInstance';

import Cookies from 'js-cookie';

const Register = () => {

    const history = useHistory();

    const [ user , setUser ] = useState({
        name:'',
        email:'',
        phoneNo:'',
        password:''
    })

    const [response , setResponse] = useState('');

    const { name , email , phoneNo , password } = user;

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
        const res = await AxiosInstance.post( '/vendor/register' , user , config );
        
        console.log(res);
        
        res.data.error!==null ? setResponse(res.data.error) : history.push('/');
    }

    return (
        <div className="Login register">
         <div className="logo"><img src="../logo.png" width="150vh" height="120vh"></img></div>
            <form onSubmit={onSubmit}>
                <input
                   name='name'
                   type='text'
                   autoComplete="off"
                   value={name}
                   placeholder='Enter Name'
                   onChange={handleChange}
                   required 
                />
                <input
                   name='email'
                   type='email'
                   value={email}
                   autoComplete="off"
                   placeholder='Enter Email'
                   onChange={handleChange}
                   required 
                />
                <input
                   name='phoneNo'
                   type='Number'
                   value={phoneNo}
                   autoComplete="off"
                   placeholder='Enter Phone Number'
                   onChange={handleChange}
                   required 
                />
                <input
                   name='password'
                   type='password'
                   value={password}
                   autoComplete="off"
                   placeholder='Enter Password'
                   onChange={handleChange}
                   required 
                />
                <button className="button" type='submit'>
                     Register
                </button>
            </form>

            <div className="oldUser">
                Already registered ? 
                <Link to='/user/login'>
                     <span>Login</span>
                </Link>
            </div>
            {response}
        </div>
    )
}

export default Register
