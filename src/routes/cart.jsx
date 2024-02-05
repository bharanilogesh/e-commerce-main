import Navbar from '../components/nav-bar/Navbar';
import { useCartGLobalContext } from '../context/context';
import '../components/cart.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    clearCart,
    removeItem,
    increaseItem,
    decreaseItem,
    totalPrice,
  } = useCartGLobalContext();
  const handleBuy = () => {
    if (cart.length > 0) {
      Swal.fire({
        title: 'Done',
        text: `Your order placed $ ${totalPrice}`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      });
    }
    navigate('/products');
    clearCart();
  };
  return (
    <div className='cart'>
      <Navbar />
      <div className='cart-content'>
        <div className='cart-header'>
          {cart.map((item) => (
            <div className='cart-items' key={item.id}>
              <img src={item.image} alt='' className='cart-icon' />
              <div className='cart-products'>
                <section className='details'>
                  <h2 className='name'>{item.text}</h2>
                  <h4> ₹{item.price}</h4>
                  <p className='desc'>{item.details}</p>
                </section>
                <div className='button-section'>
                  <button
                    className='remove-btn'
                    onClick={() => removeItem(item)}
                  >
                    Remove
                  </button>
                  <button
                    className='add-btn'
                    onClick={() => increaseItem(item)}
                  >
                    +
                  </button>
                  <button
                    className='decrease-btn'
                    onClick={() => decreaseItem(item)}
                  >
                    -
                  </button>
                </div>
              </div>
              <div>
                <h2 className='quantity'>
                  Quantity:
                  <span>{item.quantity}</span>
                </h2>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <section className='cart-footer'>
            <button className='clear-btn' onClick={handleBuy}>
              Buy now
            </button>
            <h1 className='total'>
              Total:<span> ₹{`${totalPrice.toFixed(2)}`}</span>
            </h1>
          </section>
        )}
      </div>
      <Link to={'/products'}>
        <button className='button'>Click to Add</button>
      </Link>
    </div>
  );
};

export default Cart;
