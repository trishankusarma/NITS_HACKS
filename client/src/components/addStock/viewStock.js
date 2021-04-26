import React,{useState,useEffect} from 'react';

import AxiosInstance from '../../utilsClient/AxiosInstance';

const  ViewStock = () => {

    const [ products , setProducts ] = useState([]);

    const [respose , setResponse ] = useState('');

    useEffect(() => {

        AxiosInstance.get(`/vendor/all`)
            
        .then((response) => {

                console.log(response.data);
               
                if(response.data.error!==null){
                    
                    setResponse(response.data.error);
                    
                    return;
                }
            
                setProducts(response.data.products);
                
        }).catch((error) => {
                console.log(error);
        });
    }, [])

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

    return (
        <div>
            {respose}

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

export default ViewStock
