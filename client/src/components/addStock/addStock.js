import React,{useState} from 'react';

import AxiosInstance from '../../utilsClient/AxiosInstance';

const  AddStock = () => {

    const [ product , setProduct ] = useState({
        name:'',
        quantity:'',
        price:''
    })

    const [ products , setProducts ] = useState([]);
 
    const [ fileD , setFileD] = useState(null);
    const [ response , setResponse ] = useState('');

    const setFile = (e)=>{

        setFileD(e.target.files[0]);
    }

    const arrayBufferToBase64 = (buffer)=>{

        var binary = '';
     
        var bytes = [].slice.call(new Uint8Array(buffer));
     
        bytes.forEach((b) => binary += String.fromCharCode(b));
     
        return window.btoa(binary);
    };

    const setImageUrl = (product)=>{
        const base64Flag = `data:${product.imageType};base64,`;
           
        const imageStr = arrayBufferToBase64(product.image.data);

        return  base64Flag + imageStr ;
    }

    const { name , price , quantity } = product;

    const handleChange = (e)=>{
        setProduct({
            [e.target.name]:e.target.value
        })
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

        formData.append('name',name);
        formData.append('product',product);
        formData.append('price',price);
        if(fileD!==null){
           formData.append('upload_image',fileD);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        AxiosInstance.post(`/vendor/one`,formData,config)
            
        .then((response) => {

                console.log(response.data);
               
                if(response.data.error!==null){
                    
                    setResponse(response.data.error);
                    
                    return;
                }
            
                setProducts([...products,response.data.product]);

                setProduct({
                    name:'',
                    quantity:'',
                    price:''
                })

                setFileD(null);
                
        }).catch((error) => {
                console.log(error);
        });
    }

    return (
        <div className='addContianer'>

            <form className='card' onSubmit={onSubmit}>
                 <input
                    name='name'
                    type='text'
                    value={name}
                    autoComplete="off"
                    placeholder='Add Product Name'
                    onChange={handleChange}
                    required 
                 />
                 <br />
                  <input
                    name='quantity'
                    type='Number'
                    value={quantity}
                    autoComplete="off"
                    placeholder='00'
                    onChange={handleChange}
                    required 
                 />
                 <span>kg</span>
                 <br />
                 <input
                    name='price'
                    type='Number'
                    value={price}
                    autoComplete="off"
                    placeholder='Price'
                    onChange={handleChange}
                    required 
                 />
                 <br />

                 <label>Add Image</label><br/>

                 <input 
                     type='file' 
                     name='upload_image'
                     value={fileD}
                     onChange={setFile}
                     required
                 />

                 <button type='submit'>
                     Add Stock
                 </button>
            </form>

            { products.map(prod=>{
                <div className='card1'> 
                     <span>{prod.name}</span><br />
                     <span>{prod.quantity}</span>kg<br />
                     <span>{prod.price}</span>
                     <img type={prod.imageType} src={setImageUrl(prod)}  />
                </div>    
            })}
        </div>
    )
}

export default AddStock
