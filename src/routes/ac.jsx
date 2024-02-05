import React, { useState } from 'react';
import { acProducts } from '../components/data';
import Navbar from '../components/nav-bar/Navbar';
import { useCartGLobalContext } from '../context/context';
import Swal from 'sweetalert2';
const Ac = () => {
  const { addToCart } = useCartGLobalContext();
  const handleClick = (item) => {
    const newItem = { ...item };
    addToCart(newItem);
    Swal.fire({
      title: 'Done',
      text: `${item.text} Added to the cart`,
      imageUrl: item.image,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });
  };
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div>
      <Navbar updateSearchQuery={setSearchQuery} />
      <div className=' product-description'>
        <img
          className='head-img'
          src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1684576071/Croma%20Assets/CMS/PCP/Air%20Conditionr/May%202023/desktop/MAIN%20BANNER/PCP_AC_NC_17may2022_pwvkiv.png?tr=w-2048'
          alt=''
        />
        <h3 className='img-desc'>
          Whether you live in a small apartment or a palatial bungalow, an Air
          Conditioner makes your life easier. No matter your budget or room
          size, you’ll always find the right type of AC for you at Croma.
        </h3>
      </div>
      <div>
        <div className='watch-container'>
          {acProducts
            .filter((item) =>
              item.text.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ image, text, details, price, id, quantity }) => {
              return (
                <div className='individual-item' key={id}>
                  <img src={image} alt='' className='product-icon' />
                  <div className='details'>
                    <h2 className='name'>{text}</h2>
                    <h4>{price}</h4>
                    <p>{details}</p>
                    <button
                      className='cart-btn'
                      onClick={() =>
                        handleClick({
                          image,
                          text,
                          details,
                          price,
                          id,
                          quantity,
                        })
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Ac;
