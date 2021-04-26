import React,{ useEffect , useState , useContext } from 'react'

import { Link , useHistory } from 'react-router-dom';

import Cookies from 'js-cookie';

import AxiosInstance from '../../utilsClient/AxiosInstance';

import UserContext from '../../contexts/userContexts/userContext';

import '../../css/profile/profile.css';

const User = () => {

    const [ response , setResponse ] = useState('');
    const [ User , set_User ] = useState(null);
    const [ imgSrc , setImgSrc ] = useState(null);

    const { setUser , user } = useContext(UserContext);

    const history = useHistory();

    const arrayBufferToBase64 = (buffer)=>{

        var binary = '';
     
        var bytes = [].slice.call(new Uint8Array(buffer));
     
        bytes.forEach((b) => binary += String.fromCharCode(b));
     
        return window.btoa(binary);
    };

    const setImageUrl = (user)=>{
        const base64Flag = `data:${user.profileType};base64,`;
           
        const imageStr = arrayBufferToBase64(user.profile.data);

        setImgSrc( base64Flag + imageStr );
    }

    useEffect(async()=>{

        console.log(user);

        if(user!==null & user!==User){
            set_User(user);

            if(user.profileType){
                setImageUrl(user);
            }

            return;
        }

        if(User===null){
            if(Cookies.get('authorization')){
                const res = await AxiosInstance.get('/user');
      
                console.log(res);
      
                if(!res.data.error){
                   
                  set_User(res.data.user);
      
                  setUser(res.data.user);
      
                  if(res.data.user.profileType){
                       setImageUrl(res.data.user);
                  }
      
                }else{
                   setResponse(res.data.error);
                   history.push('/user/login');
                }
            }else{
                  history.push('/user/login');
            }
        }
    },[user])

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
        <>
        <div className='profile'>
            
            <div className='profileImg'>
                {imgSrc!==null ?
                 <img type={User.profileType} src={imgSrc}  />
                 : 
                 <div class='imgAlt'>       
                 </div>
              }
            </div>

            <div className='profileInfo'>
              { User!==null ? 
              <div className='profileInfoIn'>
                  <span>{User.name}</span>
                  <span>{User.phoneNo}</span>
                  <span>{User.email}</span>
               </div>
              : 
              <div className='profileInfoIn'>
                  <span>Name</span>
                  <span>PhoneNe</span>
                  <span>Email</span>
               </div>
              }
            </div>

            <div className='topLeft'>
               <button onClick={logOut} className='logOut'>
                   Log Out
               </button>
               <br/>
               {user!==null ? 
                <button className='edit btn'>
                   <Link to='/user/edit'>
                        Edit
                   </Link>
                </button> :
                <button className='edit btn'>
                   Edit
                </button>
               }
            </div>
            <div className='bottomCenter '>
               <button>
                   <Link to='/' style={{whiteSpace:'nowrap'}}>
                       Add Stock Page
                   </Link>
               </button>
               <button>
                   <Link to='/user/viewStock' style={{whiteSpace:'nowrap'}}>
                       View Stock
                   </Link>
               </button>
               <button>
                   <Link to='/user/viewDemand' style={{whiteSpace:'nowrap'}}>
                       View Demand
                   </Link>
               </button>
            </div>
        </div>
      </>
    )
}

export default User
