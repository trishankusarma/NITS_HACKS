import React,{ useState , useEffect } from 'react'

import { Link , useHistory } from 'react-router-dom';

import AxiosInstance from '../../utilsClient/AxiosInstance';

import axios from 'axios';

import Cookies from 'js-cookie';

const Register = () => {

    const history = useHistory();

    const [ user , setUser ] = useState({
        name:'',
        email:'',
        phoneNo:'',
        password:'',
        address:''
    })

    const [response , setResponse] = useState('');

    const { name , email , phoneNo , password ,address } = user;

    const handleChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    useEffect(async()=>{

        // if(Cookies.get('authorization')){          
        //      history.push('/customer');
        // }
    },[])

    const onSubmit = async (e)=>{
        e.preventDefault();

        const respo = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}
                    .json?access_token=pk.eyJ1IjoidHJpc2hhbmt1c2FybWExNjUiLCJhIjoiY2tueXowamk4MDBxYzJ4cGdyeHkwcnZicyJ9.SWh1p75aT6XbQrgO1J1fMQ
                    &limit=1`,{
                        withCredentials:true,
                        credentials:'include'
                    });
        
        console.log(respo);

        const config = {
            header: {
              'Content-Type': 'application/json'
            }
        }
        const res = await AxiosInstance.post( '/user/register' , user , config );
        
        console.log(res);
        
        res.data.error!==null ? setResponse(res.data.error) : history.push('/customer');
    }

    return (
        <div className="Login register">
       
        <form onSubmit={onSubmit}>
        <div className="logo"><img src="../logo.png" width="150vh" height="120vh"></img></div>
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
             <input
               name='address'
               type='text'
               autoComplete="off"
               value={address}
               placeholder='Enter Address'
               onChange={handleChange}
               required 
            />
            <button className="button" type='submit'>
                 Register
            </button>
        </form>

        <div className="oldUser">
            Already registered ? 
            <Link to='/customer/login'>
                 <span>Login</span>
            </Link>
        </div>
        {response}
    </div>
    )
}

export default Register
