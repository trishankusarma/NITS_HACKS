import React,{ useEffect , useState } from 'react';

import '../../css/stockCard/stockCard.css';

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

    const addToCart =async ({id})=>{

        console.log(id)

        const config = {
            header: {
              'Content-Type': 'application/json'
            }
        }

        const res = await AxiosInstance.post('/user/addTocart', id, config );

        if(res.data.error!==null){
            setResponse('Item Added to Cart');
        }
    }

    return (
        <div style={{width:'100vw',display:'flex',flexDirection:'column'}}>
            <h2 style={{textAlign:'center',color:"beige",fontFamily:"cursive",margin:"5vh 0 2vh"}}>View Products in Stock</h2>
            {response}

            {products.map(prod=>{
                return(
                    <div className='card1' key={prod._id} style={{textAlign:'center',marginTop:'5vh'}}> 
                       <img type={prod.productType} src={setImageUrl(prod)} height='250px' width='260px'/>
                       <div className="container">
                           <span>{prod.name}</span><br />
                           <span>{prod.quantity} kg</span><br />
                           <span>₹ {prod.price}</span>
                      </div>
                      <div className='container2'>
                         <span>{prod.owner.name}</span>
                         <span>{prod.owner.phoneNo}</span>

                         <button onClick={()=>addToCart({id:prod._id})} className='btn' style={{marginTop:'10px'}}>
                           Add to cart
                        </button>

                      </div> 
                      {response}
                   </div>
                )
            })}
        </div>
    )
}

export default BuyersPage
