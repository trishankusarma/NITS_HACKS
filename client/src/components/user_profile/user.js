import React,{ useEffect , useState } from 'react'

import { Link , useHistory } from 'react-router-dom';

import Cookies from 'js-cookie';

import AxiosInstance from '../../utilsClient/AxiosInstance';

const User = () => {

    const [ response , setResponse ] = useState('');
    const [ user , setUser ] = useState(null);
    const [ fileD , setFileD ] = useState(null); 

    const history = useHistory();

    const setFile = (e)=>{
        setFileD(e.target.files[0]);
    }

    const onSubmit = async (e)=>{

        e.preventDefault();

        if(fileD && !(fileD.type==='image/png' || fileD.type==='image/jpg' || fileD.type==='image/jpeg' )){
            
            setResponse(`Please Upload a image less than 1MB `);
                        
            return;
        }

       if(fileD && fileD.size>1000000){

           setResponse(`Please Upload a image or pdf less than 1MB ${fileD.size} kb is not allowed`);
   
           return;
        }

        const formData = new FormData();

        formData.append('upload_profile',fileD);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        AxiosInstance.patch(`/user/uploadProfile`,formData,config)
            
        .then((response) => {

                console.log(response.data);
               
                if(response.data.error!==null){
                    
                    setResponse(response.data.error);
                    
                    return;
                }
                          
        }).catch((error) => {
                console.log(error);
        });
    }


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

            <form onSubmit={onSubmit} >
                <input type='file' 
                        name="upload_profile" 
                        onChange={setFile} required />
                <button type='submit'>
                    Upload
                </button>
            </form>

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
