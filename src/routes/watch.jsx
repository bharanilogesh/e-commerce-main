import { useState } from 'react';
import { watchProducts } from '../components/data';
import Navbar from '../components/nav-bar/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { useCartGLobalContext } from '../context/context';
import Swal from 'sweetalert2';
const Watch = () => {
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

      <div className='watch-container'>
        <div className=' product-description'>
          <img
            className='head-img'
            src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1669215276/Croma%20Assets/CMS/CAtegory/Wearable%20PCP%20C929/Desktop/Main/pcp_wearables_rotating_12nov2022_lpdorg.png?tr=w-2048'
            alt=''
          />
          <h3 className='img-desc'>
            Whether you want to boost your gaming experience with the latest
            virtual reality headset, ramp up your fitness with the newest
            fitness tracker, exchange your analog watch with smart watch or just
            explore what else is out there in wearable technology, we’ve got you
            covered. From Smart Watches and Fitness Trackers to VR headsets,
            Croma has it all covered under one roof.
          </h3>
        </div>
        {watchProducts
          .filter((item) =>
            item.text.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(({ image, text, details, price, id, quantity }) => {
            return (
              <div className='individual-item' key={id}>
                <img src={image} alt='' className='product-icon' />
                <div className='details'>
                  <h2 className='name'>{text}</h2>
                  <h4>₹{price}</h4>
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
  );
};

export default Watch;
