import React,{ useEffect , useState } from 'react'

import { Link , useHistory } from 'react-router-dom';

import Cookies from 'js-cookie';

import AxiosInstance from '../../utilsClient/AxiosInstance';

const User = () => {

    const [ response , setResponse ] = useState('');
    const [ user , setUser ] = useState(null);

    const history = useHistory();

    useEffect(async()=>{

        if(Cookies.get('authorization')){
          const res = await AxiosInstance.get('/user');

          console.log(res);

          if(!res.data.error){
             setUser(res.data.user);
          }else{
             setResponse(res.data.error);
             history.push('/user/login');
          }
        }else{
            history.push('/user/login');
        }
    },[])

    const logOut = async () =>{

        const res = await AxiosInstance.get('/user/logout');

        if(res.data.error===null){
            history.push('/user/login');
        }
        else{
            setResponse(res.data.error);
        }
    }

    return (
        <div>
            User Profile

            { user!==null ? 
              <div><br/>
                  <span>User Name: {user.name}</span><br/>
                  <span>User Email: {user.email}</span><br/>
                  <span>User PhoneNo: {user.phoneNo}</span>
               </div>
            : 
              <span>{response}</span>
            }

            <div>
                Not an User ? 
                <Link to='/user/register'>
                     Register
                </Link>
            </div>

            <button onClick={logOut}>
               Log Out
            </button>

        </div>
    )
}

export default User
