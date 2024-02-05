import React from 'react';
import { audioProducts } from '../components/data';
import Navbar from '../components/nav-bar/Navbar';
import { useCartGLobalContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Swal from 'sweetalert2';
const audio = () => {
  const { addToCart } = useCartGLobalContext();
  const handleClick = (item) => {
    const newItem = { ...item, id: uuidv4 };
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
          src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1684506066/Croma%20Assets/CMS/CAtegory/C44%20Home%20Theatre%20Soundbar/HT%20soundbar%20PCP/desktop/main%20banners/PCP_HT_sounbars_15may2023_spjqjw.png?tr=w-2048'
          alt=''
        />
        <h3 className='img-desc'>
          As TVs get slimmer, Soundbars and Home Theatre Systems are getting
          more popular than ever before. Even the most basic of Soundbars and
          Home Theatre Systems can take your television viewing to a new level.
          Turns out, we have a whole wide range at Croma for you to pick from.
        </h3>
      </div>
      <div>
        <div className='watch-container'>
          {audioProducts
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

export default audio;
