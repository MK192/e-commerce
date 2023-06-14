import { useEffect, useState, useRef } from 'react';
import { StyledNav } from './ComponentStyles/Nav.styled';
import { useCart } from './DataProvider';
import Image from 'next/image';
const Nav = ({ setShowModalCart, active }: any) => {
  const [emptyCart, setEmptyCart] = useState(true);
  const { cart, setCart } = useCart();
  const [cartItems, setCartItems] = useState(0);
  useEffect(() => {
    !cart || cart?.length === 0 ? setEmptyCart(true) : setEmptyCart(false);
    setCartItems(cart?.length);
  }, [cart, cartItems]);

  return (
    <StyledNav active={active}>
      <strong>STORE</strong>
      <div className="cart">
        {active && <div className="cart-item">ITEM(S) ADDED</div>}
        <Image
          src="/cart.png"
          height={40}
          width={45}
          alt="green shopping cart"
          onClick={() => setShowModalCart(true)}
          className={emptyCart ? 'empty-cart-image' : 'cart-image'}
        />
        {cart?.length > 0 && <div className="number-of-items">{cartItems}</div>}
      </div>
    </StyledNav>
  );
};
export default Nav;
