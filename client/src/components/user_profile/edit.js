import React,{ useContext , useState , useEffect } from 'react'

import AxiosInstance from '../../utilsClient/AxiosInstance';

import UserContext from '../../contexts/userContexts/userContext';

import Cookies from 'js-cookie';

const Edit = () => {

    const { setUser , user } = useContext(UserContext);

    const [ User , set_User ] = useState(null);

    useEffect(async ()=>{

        if(user){
            set_User(user);
        }

        if(user===null && Cookies.get('authorization')){
            const res = await AxiosInstance.get('/user');
  
            console.log(res);
  
            if(!res.data.error){
               
              set_User(res.data.user);
  
            }
        }
    },[])

    const [ fileD , setFileD ] = useState(null); 

    const [ response , setResponse ] = useState('');

    const handleChange = (e)=>{
       set_User({
           ...User,
           [e.target.name]:e.target.value
       })
    }

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

        formData.append('name',User.name);
        formData.append('email',User.email);
        formData.append('phoneNo',User.phoneNo);
        if(fileD!==null){
           formData.append('upload_profile',fileD);
        }
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
                
                setUser(response.data.user);
                          
        }).catch((error) => {
                console.log(error);
        });
    }

    return (
        <div>

            {response}

             <form onSubmit={onSubmit} >

             <input
                   name='name'
                   type='text'
                   autoComplete="off"
                   value={User!==null ? User.name : ''}
                   onChange={handleChange}
                   required 
                />
                <input
                   name='email'
                   type='email'
                   value={User!==null ? User.email : ''}
                   autoComplete="off"
                   onChange={handleChange}
                   required 
                />
                <input
                   name='phoneNo'
                   type='Number'
                   value={User!==null ? User.phoneNo : ''}
                   autoComplete="off"
                   onChange={handleChange}
                   required 
                />

                <input type='file' 
                        name="upload_profile" 
                        onChange={setFile}  />
                 
                <button type='submit'>
                      Edit
                </button>
              </form>
        </div>
    )
}

export default Edit;
