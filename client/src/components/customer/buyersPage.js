import React,{ useEffect , useState } from 'react';

import AxiosInstance from '../../utilsClient/AxiosInstance';

const BuyersPage = () => {

    const [ products , setProducts ] = useState([]);
    const [ response , setResponse] = useState('');

    useEffect(async () => {
        const res = await AxiosInstance.get('/products');

        if(res.error!==null){
            setProducts(res.data.products);
        }
        else{
            setResponse(res.data.error);
        }
    },[])

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
        <div style={{width:'100vw',display:'flex',flexDirection:'column'}}>
            <h2 style={{textAlign:'center'}}>View Products in Stock</h2>
            {response}

            {products.map(prod=>{
                return(
                    <div className='card1' key={prod._id} style={{textAlign:'center',marginTop:'5vh'}}> 
                       <img type={prod.productType} src={setImageUrl(prod)}  />
                       <div className="container">
                           <span>{prod.name}</span><br />
                           <span>{prod.quantity} kg</span><br />
                           <span>₹ {prod.price}</span>
                      </div>
                      <div className='container'>
                         <span>{prod.owner.name}</span>
                         <span>{prod.owner.phoneNo}</span>
                      </div> 
                   </div>
                )
            })}
        </div>
    )
}

export default BuyersPage
