import React, { useState } from 'react';
import { washingMachineProducts } from '../components/data';
import Navbar from '../components/nav-bar/Navbar';
import { useCartGLobalContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
const WashingMachines = () => {
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
          src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1687777519/Croma%20Assets/CMS/PCP/June%20-2023/26-06-2023/desktop/main%20banner/PCP_WM_26june2023_aytvbo.png?tr=w-2048'
          alt=''
        />
        <h3 className='img-desc'>
          Whether it’s pouring outside or it’s winter that’s keeping your
          clothes from drying, a washing machine makes your life easier in all
          seasons. No matter your budget, you’ll always find the right type of
          washing machine for you at Croma.
        </h3>
      </div>
      <div>
        <div className='watch-container'>
          {washingMachineProducts
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
                          id,
                          price,
                          text,
                          details,
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

export default WashingMachines;
