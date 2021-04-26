import React,{useState} from 'react';

import AxiosInstance from '../../utilsClient/AxiosInstance';

import '../../css/addProduct/addProduct.css'

const  AddStock = () => {

    const [ product , setProduct ] = useState({
        name:'',
        quantity:'',
        price:''
    })

    const {name,quantity,price} = product;

    const [ products , setProducts ] = useState([]);
 
    const [ fileD , setFileD] = useState(null);
    const [ response , setResponse ] = useState('');

    const setFile = (e)=>{

      //  setFileD(e.target.files[0]);
      setFileD(e.target.files[0]);
    }

    const arrayBufferToBase64 = (buffer)=>{

        var binary = '';
     
        var bytes = [].slice.call(new Uint8Array(buffer));
     
        bytes.forEach((b) => binary += String.fromCharCode(b));
     
        return window.btoa(binary);
    };

    const setImageUrl = (product)=>{
        const base64Flag = `data:${product.productType};base64,`;
           
        const imageStr = arrayBufferToBase64(product.productImage.data);

        return  base64Flag + imageStr ;
    }

    const handleChange = (e)=>{

        setProduct({
            ...product,
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
        formData.append('quantity',quantity);
        formData.append('price',price);
        if(fileD!==null){
           formData.append('upload_product',fileD);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        AxiosInstance.post(`/vendor/one`,formData,config)
            
        .then((response) => {
               
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
        <div className='addProduct'>

            <form onSubmit={onSubmit}>
                 <input 
                    name='name'
                    type='text'
                    value={name}
                    autoComplete="off"
                    placeholder='Add Product Name'
                    onChange={handleChange}
                    required 
                 />
                  <input 
                    name='quantity'
                    type='Number'
                    value={quantity}
                    autoComplete="off"
                    placeholder='00 kg'
                    onChange={handleChange}
                    required 
                 />
                 <input 
                    name='price'
                    type='Number'
                    value={price}
                    autoComplete="off"
                    placeholder='Price'
                    onChange={handleChange}
                    required 
                 />
                 <input 
                     type='file' 
                     name='upload_product'
                     onChange={setFile}
                     required
                 />

                 <button type='submit'>
                     Add Stock
                 </button>
            </form>

            { products.map(prod=>{
                return(
                    <div className='card1' style={{textAlign:'center',marginTop:'5vh'}}> 
                     <span>{prod.name}</span><br />
                     <span>{prod.quantity}</span>kg<br />
                     <span>{prod.price}</span>
                     <img type={prod.productType} src={setImageUrl(prod)}  />
                </div>  
                )  
            })}
        </div>
    )
}

export default AddStock
