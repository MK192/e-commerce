import { useEffect, useState } from 'react';
import { StyledNav } from './ComponentStyles/Nav.styled';
import { useCart } from './DataProvider';
import Image from 'next/image';

type Props = {
  setShowModalCart: (showModalCart: boolean) => void;
  active: boolean;
};

const Nav = ({ setShowModalCart, active }: Props) => {
  const [emptyCart, setEmptyCart] = useState(true);
  const { cart } = useCart();
  const [cartItems, setCartItems] = useState(cart?.length || null);

  useEffect(() => {
    !cart || cart?.length === 0 ? setEmptyCart(true) : setEmptyCart(false);

    setCartItems(cart?.length);
  }, [cart, cartItems]);

  return (
    <StyledNav active={active}>
      <strong>STORE</strong>
      <div className="cart">
        <div className="cart-item-hidden">Hid</div>
        {active && <div className="cart-item">ITEM(S) ADDED</div>}
        <Image
          src="/cart.png"
          height={40}
          width={45}
          alt="green shopping cart"
          onClick={() => setShowModalCart(true)}
          className={emptyCart ? 'empty-cart-image' : 'cart-image'}
        />
        {cart?.length > 0 && (
          <div
            className="number-of-items"
            onClick={() => setShowModalCart(true)}
          >
            {cartItems}
          </div>
        )}
      </div>
    </StyledNav>
  );
};
export default Nav;
