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
                const res = await AxiosInstance.get('/vendor/profile');
      
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

        const res = await AxiosInstance.get('/vendor/logout');

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
                 <img src="https://picsum.photos/100/100"/>
              }
            </div>

            <div className='profileInfo'>
              { User!==null ? 
              <div className='profileInfoIn'>
                  <div>{User.name}</div>
                  <div>{User.phoneNo}</div>
                  <div>{User.email}</div>
               </div>
              : 
              <div className='profileInfoIn'>
                  <div>Name</div>
                  <div>PhoneNe</div>
                  <div>Email</div>
               </div>
              }
            </div>

            <div className='topLeft'>
               <button onClick={logOut} className='logOut edit'>
                   Log Out
               </button>
               <br/>
               {user!==null ? 
                <button className='edit' >
                   <Link to='/user/edit' style={{whiteSpace:'nowrap',textDecoration:'none',color:'white'}}>
                        Edit
                   </Link>
                </button> :
                <button className='btn'>
                   Edit
                </button>
               }
            </div>
            <div className='bottomCenter '>
               <button className="btn">
                   <Link to='/' style={{whiteSpace:'nowrap',textDecoration:'none',color:'white'}}>
                       Add Stock
                   </Link>
               </button>
               <button className="btn">
                   <Link to='/user/viewStock' style={{whiteSpace:'nowrap',textDecoration:'none',color:'white'}}>
                       View Stock
                   </Link>
               </button>
               <button className="btn">
                   <Link to='/user/viewDemand' style={{whiteSpace:'nowrap',textDecoration:'none',color:'white'}}>
                       View Demand
                   </Link>
               </button>
               <button className="btn">
                   <Link to='/user/viewOrder' style={{whiteSpace:'nowrap',textDecoration:'none',color:'white'}}>
                       Orders
                   </Link>
               </button>
            </div>
        </div>
      </>
    )
}

export default User
