import React,{useState,useEffect} from 'react';

import AxiosInstance from '../../utilsClient/AxiosInstance';

import "../../css/stockCard/stockCard.css";
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
        const base64Flag = `data:${product.productType};base64,`;
           
        const imageStr = arrayBufferToBase64(product.productImage.data);

        return  base64Flag + imageStr ;
    }

    return (
        <div>
            {respose}

            { products.map(prod=>{
                return(
                 <div className='card1'> 
                 <img type={prod.productType} src={setImageUrl(prod)} height="250px" width="250px"  />
                 <div className="container">
                     <span>{prod.name}</span><br />
                     <span>{prod.quantity} kg</span><br />
                     <span>₹{prod.price} </span><span style={{fontSize:"0.8rem",fontWeight:"100"}}>per kg</span>
                    </div> 
                </div> 
                )   
            })}
        </div>
    )
}

export default ViewStock
