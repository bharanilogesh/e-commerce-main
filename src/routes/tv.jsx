import React, { useState } from 'react';
import Navbar from '../components/nav-bar/Navbar';
import { useCartGLobalContext } from '../context/context';
import { tvProducts } from '../components/data';
import Swal from 'sweetalert2';
const Tv = () => {
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
          src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1684312434/Croma%20Assets/CMS/LP%20Page%20Banners/PCP_TV_NC_15may2023_uv2e0k.png?tr=w-2048'
          alt=''
        />
        <h3 className='img-desc'>
          Streaming services have made it possible to watch your favourite shows
          and live events on any screen you desire. But every so often you need
          a screen large enough so you can sink into your sofa or curl up in bed
          and watch your beloved stories come to life. It doesn't matter what
          your lifestyle is, there is always a TV for you at Croma.
        </h3>
      </div>
      <div>
        <div className='watch-container'>
          {tvProducts
            .filter((item) =>
              item.text.toLowerCase().includes(searchQuery.toLocaleLowerCase())
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

export default Tv;
